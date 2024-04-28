const express = require('express');
const router = express.Router();
const { createAppointment } = require('../controllers/appointmentController');
const verifyToken = require('../middleware/auth');

router.post('/', verifyToken, createAppointment);

module.exports = router;
