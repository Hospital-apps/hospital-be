const express = require('express');
const verifyToken = require('../middleware/auth');
const { createPackage, getAllPackage } = require('../controllers/packageController');
const router = express.Router();

router.post('/', verifyToken, createPackage);
router.get('/', verifyToken, getAllPackage);

module.exports = router;