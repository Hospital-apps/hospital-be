const express = require('express');
const verifyToken = require('../middleware/auth');
const { createPackage, getAllPackage, updatePackage } = require('../controllers/packageController');
const router = express.Router();

router.post('/', verifyToken, createPackage);
router.get('/', verifyToken, getAllPackage);
router.put('/:name', verifyToken, updatePackage);

module.exports = router;