const express = require('express');
const router = express.Router();
const { getAppointmentById } = require('../controllers/appointmentDetailController');
const verifyToken = require('../middleware/auth');

router.get('/:appointmentId', getAppointmentById);



module.exports = router;
