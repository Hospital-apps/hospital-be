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
exports.updateAppointmentStatus = async (req, res) => {
  const appointmentId = req.params.appointmentId;
  const newStatus = req.body.status; // Get status from request body

  // Check if the new status is valid
  const validStatuses = ['pending', 'started', 'finish'];
  if (!validStatuses.includes(newStatus)) {
    return res.status(400).json({
      message: "Invalid status. Valid statuses are 'pending', 'started', and 'finish'."
    });
  }

  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status: newStatus },
      { new: true, runValidators: true } // Ensures validators run and returns the updated document
    ).populate('doctorId', 'fullName');  // Assuming you want to keep the doctor information in the response

    if (!updatedAppointment) {
      return res.status(404).json({
        message: "Appointment not found"
      });
    }

    res.status(200).json({
      message: "Appointment status updated successfully",
      data: updatedAppointment
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update appointment status",
      error: error.message
    });
  }
};
