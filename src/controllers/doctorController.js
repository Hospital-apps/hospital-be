const Doctor = require('../models/Doctor');

exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({ role: 'dokter' });
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.addScheduleDoctor = async (req, res) => {
  const { doctorId, specialtyId, schedule } = req.body;

  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    doctor.specialtyId = specialtyId;
    doctor.schedule = schedule; 

    await doctor.save();

    res.status(200).json({
      message: "Doctor's specialty and schedule updated successfully",
      doctor
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  
//get profile dokter
exports.getProfileDokter = async (req, res) => {
  try {
    const doctorId = req.params.id; // Ambil ID dokter dari parameter request
    const profileDokter = await Doctor.findById(doctorId)
      .select('fullName phoneNumber _id specialtyId');
    if (!profileDokter) {
      return res.status(404).json({ message: 'Dokter nothing' });
    }
    res.send({
      message: "server access",
      data: profileDokter
    })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
};