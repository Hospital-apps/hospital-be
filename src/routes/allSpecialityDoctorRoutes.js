const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const {getAllDoctorsWithSpecialtyAndSchedule} = require('../controllers/doctorSpesialisController');
router.get('/', getAllDoctorsWithSpecialtyAndSchedule);


module.exports = router;

