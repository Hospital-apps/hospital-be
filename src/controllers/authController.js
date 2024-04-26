const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Token = require('../models/Token');
const Doctor = require('../models/Doctor'); 


exports.register = async (req, res) => {
  const { fullName, nickname, email, phoneNumber, password, role = 'pasien' } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 8);
    
    const Model = role === 'dokter' ? Doctor : User;
    
    const newUser = new Model({
      fullName,
      nickname,
      email,
      phoneNumber,
      password: hashedPassword,
      role  
    });

    await newUser.save();

    res.status(201).json({
      status: 201,
      message: 'Registration successful',
      data: {
        fullName: newUser.fullName,
        nickname: newUser.nickname,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        role: newUser.role
      }
    });
  } catch (error) {
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
    const user = await User.findOne({ email }) || await Doctor.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        status: 401,
        message: 'Authentication failed'
      });
    }

    if (!user.isActive) {
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
