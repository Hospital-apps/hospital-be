const Appointment = require('../models/Appointment');
const History = require('../models/History'); 

exports.createAppointment = async (req, res) => {
  const { patientId, doctorId, specialtyId, time, date, status, type, package } = req.body;

  try {
      const newAppointment = new Appointment({
          patientId,
          doctorId,
          specialtyId,
          time,
          date,
          status,
          type,
          package
      });

      await newAppointment.save();

      const newHistory = new History({
          patientId,
          doctorId,
          specialtyId,
          time,
          date,
          status,
          type,
          package
      });

      await newHistory.save();  
      res.status(201).json({
          message: 'Appointment created successfully',
          data: newAppointment
      });
  } catch (error) {
      res.status(500).json({
          message: 'Failed to create appointment',
          error: error.message
      });
  }
};

exports.createMedicalCheck = async (req, res) => {
  const { time, date, status, package } = req.body;
  const patientId =  null;
  const doctorId =  null;
  const specialtyId =  null;
  const type = "Offline";
  try {
         const newAppointment = new Appointment({
          patientId ,
          doctorId,
          specialtyId,
          time,
          date,
          status,
          type,
          package
      });

      await newAppointment.save();
      const newHistory = new History({
        patientId,
        doctorId,
        specialtyId,
        time,
        date,
        status,
        type,
        package
    });

    await newHistory.save();  

      res.status(201).json({
          message: 'Medical Check Up Package created successfully',
          data: newMedicalCheck
      });
  } catch (error) {
      res.status(500).json({
          message: 'Failed to create medical check',
          error: error.message
      });
  }
}

exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to get appointments',
      error: error.message
    });
  }
}

exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.appointmentId);
    if (!appointment) {
      return res.status(404).json({
        message: 'Appointment not found'
      });
    }

    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to get appointment',
      error: error.message
    });
  }
}

exports.updateAppointmentStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user._id;
    const userRole = req.user.role;

    if (userRole !== 'dokter') {
        return res.status(403).json({
            message: "Unauthorized: Only doctors can update the status."
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
            status
        });
        await newHistory.save();

        res.status(200).json({
            message: 'Appointment status updated successfully',
            data: { status }
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to update appointment status',
            error: error.message
        });
    }
};


exports.updateAppointmentStatus = async (req, res) => {
  const { id } = req.params;
  const { status, link_gmeet } = req.body; // Extract link_gmeet along with status from the request body
  const userId = req.user._id;
  const userRole = req.user.role;

  // Ensure only doctors can update the appointment status and link
  if (userRole !== 'dokter') {
      return res.status(403).json({
          message: "Unauthorized: Only doctors can update the status and link."
      });
  }

  try {
      const appointment = await Appointment.findById(id);
      if (!appointment) {
          return res.status(404).json({ message: "Appointment not found" });
      }
      
      // Update the status and the Google Meet link if provided
      appointment.status = status;
      if (link_gmeet) {
          appointment.link_gmeet = link_gmeet;
      }

      await appointment.save();

      // Optionally create a new history record that logs this change
      const newHistory = new History({
          ...appointment._doc,
          status,
          link_gmeet  // Ensure the link is included in the history if it was updated
      });
      await newHistory.save();

      res.status(200).json({
          message: 'Appointment status and link updated successfully',
          data: {
              status: appointment.status,
              link_gmeet: appointment.link_gmeet
          }
      });
  } catch (error) {
      res.status(500).json({
          message: 'Failed to update appointment status and link',
          error: error.message
      });
  }
};
exports.updateLinkGmeet = async (req, res) => {
  const { id } = req.params;
  const { link_gmeet } = req.body;
  const userId = req.user._id;
  const userRole = req.user.role;

  // Check if the user is a doctor
  if (userRole !== 'dokter') {
      return res.status(403).json({
          message: "Unauthorized: Only doctors can update the details."
      });
  }

  try {
      const appointment = await Appointment.findById(id);
      if (!appointment) {
          return res.status(404).json({ message: "Appointment not found" });
      }

      if (appointment.status !== 'pending') {
          return res.status(400).json({
              message: "Link GMeet can only be added or updated if the status is 'pending'."
          });
      }

      appointment.link_gmeet = link_gmeet;
      await appointment.save(); 

      res.status(200).json({
          message: 'Google Meet link updated successfully',
          data: {
              status: appointment.status,  
              link_gmeet: appointment.link_gmeet
          }
      });
  } catch (error) {
      res.status(500).json({
          message: 'Failed to update the Google Meet link',
          error: error.message
      });
  }
  //appoinment information by user
};
exports.getAppointmentByUser = async (req, res) => {
    try {
        let appointments;
        if (req.user.role === 'user') { 
            appointments = await Appointment.findById(  req.user._id );
        } else if (req.user.role === 'dokter') { 
            appointments = await Appointment.findById( req.user._id );
        } else {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        if (!appointments) {
            return res.status(404).json({ message: 'Appointments not found' });
        }
        res.send({
            message: "Server access",
            data: appointments
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Internal server error',
            error: error.message
        });
    }
}
