const express = require('express');
const router = express.Router();
const { getAllDoctors, getDoctorById, getProfileDokter, updateScheduleDoctor } = require('../controllers/doctorController');
const verifyToken = require('../middleware/auth');

router.get('/', verifyToken, getAllDoctors);
router.get('/:id', verifyToken, getDoctorById);
router.put('/:id', verifyToken, updateScheduleDoctor);
// router.get('/:id', verifyToken, getProfileDokter);

module.exports = router;
