const express = require('express');
const router = express.Router();
const { getAllDoctors,getDoctorById, updateScheduleDoctor } = require('../controllers/doctorController');
const verifyToken = require('../middleware/auth');

router.get('/', verifyToken, getAllDoctors);
router.get('/:id', verifyToken, getDoctorById);
router.post('/schedule/:id', verifyToken, updateScheduleDoctor);
// router.get('/specialized', verifyToken, getAllSpecializedDoctors);


module.exports = router;
