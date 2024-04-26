const Specialty = require('../models/Speciality');

exports.createSpecialty = async (req, res) => {
  try {
    const { name } = req.body;
    const newSpecialty = new Specialty({ name });
    await newSpecialty.save();
    res.status(201).json(newSpecialty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getAllSpecialties = async (req, res) => {
  try {
    const specialties = await Specialty.find();
    res.status(200).json(specialties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getSpecialtyById = async (req, res) => {
  try {
    const specialty = await Specialty.findById(req.params.id);
    if (!specialty) {
      return res.status(404).json({ message: 'Specialty not found' });
    }
    res.status(200).json(specialty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateSpecialty = async (req, res) => {
  try {
    const updatedSpecialty = await Specialty.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedSpecialty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteSpecialty = async (req, res) => {
  try {
    await Specialty.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: 'Specialty deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
