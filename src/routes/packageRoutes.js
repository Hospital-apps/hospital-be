const express = require('express');
const verifyToken = require('../middleware/auth');
const { createPackage, getAllPackage, updatePackage, deletePackage, getPackagesByName } = require('../controllers/packageController');
const router = express.Router();

router.post('/', verifyToken, createPackage);
router.get('/', verifyToken, getAllPackage);
router.get('/:name', verifyToken, getPackagesByName);
router.put('/:name', verifyToken, updatePackage);
router.delete('/:name', verifyToken, deletePackage);

module.exports = router;