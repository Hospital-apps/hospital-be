
const Doctor = require("../models/Doctor");
exports.getAllDoctorsWithSpecialtyAndSchedule = async (req, res) => {
    try {
      // Mencari dokter dengan specialty yang terisi dan schedule yang tidak kosong
      const doctors = await Doctor.find({
        specialty: { $ne: null },  // Pastikan field specialty tidak null
        'schedule.0': { $exists: true }  // Pastikan terdapat setidaknya satu jadwal
      });
  
      if (doctors.length === 0) {
        return res.status(404).json({ message: "No doctors found with both specialty and non-empty schedule." });
      }
  
      res.status(200).json(doctors);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  