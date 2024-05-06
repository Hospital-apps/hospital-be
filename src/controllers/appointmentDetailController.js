const { default: mongoose } = require("mongoose");
const Appointment = require("../models/Appointment");

exports.getAppointmentById = async (req, res) => {
    try {
      const appointment = await Appointment.findById(req.params.appointmentId);
      if (!appointment) {
        return res.status(404).json({
          message: "Appointment not found",
        });
      }
  
      res.status(200).json((appointment));
    } catch (error) {
      res.status(500).json({
        message: "Failed to get appointment",
        error: error.message,
      });
    }
  };