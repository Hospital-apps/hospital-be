const Doctor = require("../models/Doctor");

exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({ role: "dokter" });
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
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
      doctor,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.updateScheduleDoctor = async (req, res) => {
  const { id } = req.params;
  const { day, timeSlots, specialty } = req.body;

  try {
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    if (day) {
      const daySchedule = doctor.schedule.find((dayObj) => dayObj.day === day);
      if (daySchedule) {
        daySchedule.timeSlots = timeSlots;
      } else {
        doctor.schedule.push({ day, timeSlots });
      }
    } else {
      return res
        .status(400)
        .json({ message: "Please provide day to update schedule" });
    }

    if (specialty) {
      doctor.specialty = specialty;
    }

    await doctor.save();

    res.status(200).json({
      message: "Update schedule successfully",
      data: {
        doctor: {
          id: doctor.id,
          fullName: doctor.fullName,
          nickname: doctor.nickname,
          email: doctor.email,
          phoneNumber: doctor.phoneNumber,
          isActive: doctor.isActive,
          role: doctor.role,
          specialCategory: doctor.specialCategory,
          specialty: doctor.specialty,
          schedule: doctor.schedule,
        },
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update schedule", error: error.message });
  }
};
