const express = require('express');
const router = express.Router();
const { createAppointment,getAllAppointments,getAppointmentById,updateAppointmentStatus } = require('../controllers/appointmentController');
const verifyToken = require('../middleware/auth');

router.post('/', verifyToken, createAppointment);
router.get('/', verifyToken, getAllAppointments);
router.get('/:id', verifyToken, getAppointmentById);
router.put('/:id', verifyToken, updateAppointmentStatus);

module.exports = router;
