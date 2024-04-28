const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../controllers/profileController');
const verifyToken = require('../middleware/auth'); 

router.get('/', verifyToken, getUserProfile);

module.exports = router;
