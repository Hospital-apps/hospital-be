const express = require('express');
const verifyToken = require('../middleware/auth');
const { createPackage, getAllPackage, updatePackage, deletePackage, getPackageByName } = require('../controllers/packageController');
const router = express.Router();

router.post('/', verifyToken, createPackage);
router.get('/', verifyToken, getAllPackage);
router.get('/:id', verifyToken, getPackageByName);
router.put('/:id', verifyToken, updatePackage);
router.delete('/:id', verifyToken, deletePackage);

module.exports = router;