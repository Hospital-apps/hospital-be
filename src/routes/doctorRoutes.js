const express = require('express');
const router = express.Router();
const { getAllDoctors, getDoctorById, updateScheduleDoctor } = require('../controllers/doctorController');
const verifyToken = require('../middleware/auth');

router.get('/', verifyToken, getAllDoctors);
router.get('/:id', verifyToken, getDoctorById);
router.post('/:id/schedule', verifyToken, updateScheduleDoctor);


module.exports = router;
