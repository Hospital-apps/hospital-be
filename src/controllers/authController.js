const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Token = require('../models/Token');
exports.register = async (req, res) => {
  const { fullName, nickname, email, phoneNumber, password, role = 'pasien' } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 8);

    // Create new user instance
    const user = new User({
      fullName,
      nickname,
      email,
      phoneNumber,
      password: hashedPassword,
      role
    });

    // Save the new user
    await user.save();

    // Successful response
    res.status(201).json({
      status: 201,
      message: 'Registration successful',
      data: {
        fullName: user.fullName,
        nickname: user.nickname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role
      }
    });
  } catch (error) {
    // Handle duplicate key error
    if (error.name === 'MongoError' && error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      const message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists. Please use a different ${field}.`;
      res.status(409).json({
        status: 409,
        message: message,
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

    if (user.status !== 'active') {
      return res.status(403).json({
        status: 403,
        message: 'Account is not active, please contact administrator'
      });
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '24h' }
    );

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
        token: `${tokenRecord.accessCount}|${token}`,
        role: user.role  
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message
    });
  }
};