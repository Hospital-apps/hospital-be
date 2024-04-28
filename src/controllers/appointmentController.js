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

        // Opsional: Tambahkan ke history
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
