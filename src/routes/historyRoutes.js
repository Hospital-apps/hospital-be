const express = require('express');
const router = express.Router();
const { historybyPasienDoctor} = require('../controllers/appointmentController');
const verifyToken = require('../middleware/auth');


router.get('/info', verifyToken, historybyPasienDoctor);
module.exports = router;
