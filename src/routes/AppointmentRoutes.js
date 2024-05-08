const express = require('express');
const router = express.Router();
const { createAppointment,getAllAppointments,updateAppointmentStatusPasien,updateAppointmentStatus,updateLinkGmeet,appointmentbyPasienDoctor,createMedicalCheck } = require('../controllers/appointmentController');
const verifyToken = require('../middleware/auth');

router.post('/', verifyToken, createAppointment);
router.post('/package', verifyToken, createMedicalCheck);

router.get('/', verifyToken, getAllAppointments);
// router.get('/:id', verifyToken, getAppointmentById);
router.put('/:id', verifyToken, updateAppointmentStatus);
router.put('/pasien/:id', verifyToken, updateAppointmentStatusPasien);

router.put('/link/:id', verifyToken, updateLinkGmeet);
router.get('/info', verifyToken, appointmentbyPasienDoctor);



module.exports = router;
