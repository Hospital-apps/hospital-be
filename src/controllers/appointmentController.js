const { default: mongoose } = require("mongoose");
const Appointment = require("../models/Appointment");
const History = require("../models/History");

exports.createAppointment = async (req, res) => {
  const {
    patientId,
    doctorId,
    specialty,
    time,
    day,
    status,
    type,
    package,
    link_gmeet
  } = req.body;

  try {
    const newAppointment = new Appointment({
      patientId,
      doctorId,
      specialty,
      time,
      day,
      status,
      type,
      package,
      link_gmeet: link_gmeet||"",
    });

    await newAppointment.save();

    const newHistory = new History({
      patientId,
      doctorId,
      specialty,
      time,
      day,
      status,
      type,
      package,
    });

    await newHistory.save();
    res.status(201).json({
      message: "Appointment created successfully",
      data: newAppointment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create appointment",
      error: error.message,
    });
  }
};

exports.createMedicalCheck = async (req, res) => {
  const { time, day, status, package } = req.body;
  const doctorId = null;
  const specialty = null;
  const type = "Offline";
  try {
    const newAppointment = new Appointment({
      patientId,
      doctorId,
      specialty,
      time,
      day,
      status,
      type,
      package,
    });

    await newAppointment.save();
    const newHistory = new History({
      patientId,
      doctorId,
      specialty,
      time,
      day,
      status,
      type,
      package,
    });

    await newHistory.save();

    res.status(201).json({
      message: "Medical Check Up Package created successfully",
      data: newMedicalCheck,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create medical check",
      error: error.message,
    });
  }
};

exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get appointments",
      error: error.message,
    });
  }
};

// exports.getAppointmentById = async (req, res) => {
//   try {
//     const appointment = await Appointment.findById(req.params.appointmentId);
//     if (!appointment) {
//       return res.status(404).json({
//         message: "Appointment not found",
//       });
//     }

//     res.status(200).json(appointment);
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to get appointment",
//       error: error.message,
//     });
//   }
// };

exports.updateAppointmentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const userId = req.user._id;
  const userRole = req.user.role;

  if (userRole !== "dokter") {
    return res.status(403).json({
      message: "Unauthorized: Only doctors can update the status.",
    });
  }

  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    appointment.status = status;
    await appointment.save();

    const newHistory = new History({
      ...appointment._doc,
      status,
    });
    await newHistory.save();

    res.status(200).json({
      message: "Appointment status updated successfully",
      data: { status },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update appointment status",
      error: error.message,
    });
  }
};

// exports.updateAppointmentStatus = async (req, res) => {
//   const { id } = req.params;
//   const { status, link_gmeet } = req.body; // Extract link_gmeet along with status from the request body
//   const userId = req.user._id;
//   const userRole = req.user.role;

//   // Ensure only doctors can update the appointment status and link
//   if (userRole !== "dokter") {
//     return res.status(403).json({
//       message: "Unauthorized: Only doctors can update the status and link.",
//     });
//   }

//   try {
//     const appointment = await Appointment.findById(id);
//     if (!appointment) {
//       return res.status(404).json({ message: "Appointment not found" });
//     }

//     // Update the status and the Google Meet link if provided
//     appointment.status = status;
//     if (link_gmeet) {
//       appointment.link_gmeet = link_gmeet;
//     }

//     await appointment.save();

//     // Optionally create a new history record that logs this change
//     const newHistory = new History({
//       ...appointment._doc,
//       status,
//       link_gmeet, // Ensure the link is included in the history if it was updated
//     });
//     await newHistory.save();

//     res.status(200).json({
//       message: "Appointment status and link updated successfully",
//       data: {
//         status: appointment.status,
//         link_gmeet: appointment.link_gmeet,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to update appointment status and link",
//       error: error.message,
//     });
//   }
// };
exports.updateLinkGmeet = async (req, res) => {
  const { id } = req.params;
  const { link_gmeet } = req.body;
  const userId = req.user._id;
  const userRole = req.user.role;

  // Check if the user is a doctor
  if (userRole !== "dokter") {
    return res.status(403).json({
      message: "Unauthorized: Only doctors can update the details.",
    });
  }

  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (appointment.status !== "pending") {
      return res.status(400).json({
        message:
          "Link GMeet can only be added or updated if the status is 'pending'.",
      });
    }

    appointment.link_gmeet = link_gmeet;
    await appointment.save();

    res.status(200).json({
      message: "Google Meet link updated successfully",
      data: {
        status: appointment.status,
        link_gmeet: appointment.link_gmeet,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update the Google Meet link",
      error: error.message,
    });
  }
  //appoinment information by user
};


exports.appointmentbyPasienDoctor = async (req, res) => {
  const user = req.user;
  try {
    let appointments;
    if (user.role === 'pasien') {
      appointments = await Appointment.find({ patientId: user._id })
          .populate('doctorId', 'fullName specialty');
    } else if (user.role === 'dokter') {
      appointments = await Appointment.find({ doctorId: user._id })
          .populate('patientId', 'fullName contact'); 
    } else {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving appointments", error: error.message });
  }
};


exports.historybyPasienDoctor = async (req, res) => {
  const user = req.user;
  try {
      let appointments;
      const queryConditions = { status: 'finish' }; 

      if (user.role === 'pasien') {
          queryConditions.patientId = user._id.toString();
          appointments = await History.find(queryConditions)
              .populate('doctorId', 'fullName specialty');
      } else if (user.role === 'dokter') {
          queryConditions.doctorId = user._id.toString();
          appointments = await History.find(queryConditions)
              .populate('patientId', 'fullName contact');
      } else {
          return res.status(403).json({ message: "Unauthorized access" });
      }

      res.json(appointments);
  } catch (error) {
      res.status(500).json({ message: "Error retrieving appointments", error: error.message });
  }
};

exports.updateAppointmentStatusPasien = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const userId = req.user._id;
  const userRole = req.user.role;

  if (userRole !== "pasien") {
    return res.status(403).json({
      message: "Unauthorized: Only doctors can update the status.",
    });
  }
  
  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    if (appointment.status === "finish") {
      return res.status(400).json({ message: "Appointment status is already finished." });
    }
    appointment.status = status;
    await appointment.save();

    const newHistory = new History({
      ...appointment._doc,
      status,
    });
    await newHistory.save();

    res.status(200).json({
      message: "Appointment status updated successfully",
      data: { status },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update appointment status",
      error: error.message,
    });
  }
};