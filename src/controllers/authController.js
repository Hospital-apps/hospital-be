const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Token = require('../models/Token');
exports.register = async (req, res) => {
  try {
    const { fullName, nickname, email, phoneNumber, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({
      fullName,
      nickname,
      email,
      phoneNumber,
      password: hashedPassword
    });
    await user.save();
    res.status(201).json({
      status: 201,
      message: 'Registration successful',
      data: { 
        id: user._id,
        fullName: user.fullName,
        nickname: user.nickname,
        email: user.email,
        phoneNumber: user.phoneNumber
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];      res.status(409).json({
        status: 409,
        message: `An account with that ${field} already exists. Please use a different ${field}.`,
        field: field
      });
    } else {
      res.status(500).json({
        status: 500,
        message: 'Internal server error',
        error: error.message
      });
    }
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        status: 401,
        message: 'Authentication failed'
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    let tokenRecord = await Token.findOne({ userId: user._id });
    if (tokenRecord) {
      tokenRecord.accessCount += 1;
      tokenRecord.token = token;  
    } else {
      tokenRecord = new Token({ userId: user._id, token: token, accessCount: 1 });
    }
    await tokenRecord.save();

    res.json({
      status: 200,
      message: 'Login successful',
      data: {
        token: `${tokenRecord.accessCount}|${token}`
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message
    });
  }
};
