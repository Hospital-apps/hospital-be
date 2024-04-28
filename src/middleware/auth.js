const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Doctor = require('../models/Doctor');

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
      const bearerToken = bearerHeader.split(' ')[1];
      req.token = bearerToken;
      next();
  } else {
      res.status(403).json({ message: 'No token provided' });
  }
}

// const verifyToken = async (req, res, next) => {
//     try {
//       const token = req.headers['login']?.split(' ')[1]; // Extract the token from Bearer
//       if (!token) {
//             return res.status(401).json({ message: "No token provided" });
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await User.findById(decoded._id) || await Doctor.findById(decoded._id);

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         req.user = user; 
//         next();
//     } catch (error) {
//         return res.status(401).json({ message: "Invalid or expired token" });
//     }
// };

module.exports = verifyToken;
