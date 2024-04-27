const express = require('express');
const router = express.Router();
const {
  createAppointment,
  getAllAppointments,
  getAppointmentById
} = require('../controllers/appointmentController');

router.post('/',verifyToken, createAppointment);

router.get('/', verifyToken, getAllAppointments);

router.get('/:id', verifyToken, getAppointmentById);

module.exports = router;
