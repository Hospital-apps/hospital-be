const express = require('express');
const verifyToken = require('../middleware/auth');
const { createPackage } = require('../controllers/packageController');
const router = express.Router();

router.post('/', verifyToken, createPackage);

module.exports = router;