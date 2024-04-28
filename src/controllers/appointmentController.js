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
