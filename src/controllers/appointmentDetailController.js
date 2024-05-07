const { default: mongoose } = require("mongoose");
const Appointment = require("../models/Appointment");

exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.appointmentId).populate('doctorId', 'fullName');;
    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    // Structured and cleaned response
    const response = {
      data: {
        _id: appointment._id.toString(), 
        patientId: appointment.patientId.toString(), 
        doctorId: appointment.doctorId, 
        specialty: appointment.specialty,
        time: appointment.time,
        day: appointment.day,
        status: appointment.status,
        type: appointment.type,
        package: appointment.package || "", 
        isApproved: appointment.isApproved.toString(), 
        link_gmeet: appointment.link_gmeet,
        __v: appointment.__v.toString() 
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
