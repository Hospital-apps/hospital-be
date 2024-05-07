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

    // Structured and cleaned response
    const response = {
      data: {
        _id: appointment._id.toString(), // Convert ObjectId to string
        patientId: appointment.patientId.toString(), // Assuming patientId is an ObjectId
        doctorId: appointment.doctorId.toString(), // Assuming doctorId is an ObjectId
        specialty: appointment.specialty,
        time: appointment.time,
        day: appointment.day,
        status: appointment.status,
        type: appointment.type,
        package: appointment.package || "", // Ensure empty string if undefined
        isApproved: appointment.isApproved.toString(), // Convert boolean to string
        link_gmeet: appointment.link_gmeet, // Null or string, no conversion needed
        __v: appointment.__v.toString() // Convert version key to string
      }
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get appointment",
      error: error.message,
    });
  }
};
