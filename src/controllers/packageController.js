const Package = require("../models/Package");

exports.createPackage = async (req, res) => {
  const { name, img } = req.body;
  const doctor = req.user.role;
  if (doctor !== "doctor" && !user.specialCategory) {
    return res.status(403).json({
      message: "access denied",
    });
  }

  try {
    const newPackage = new Package({
      name,
      img,
    });
    await newPackage.save();
    res.status(200).json({
      message: "data saving",
      data: newPackage,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      serverMessage: error,
    });
  }
};
exports.getAllPackage = async (req, res) => {
  try {
    const packages = await Package.find();
    res.status(200).json({
      message: "access defined",
      data: packages,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      serverMessage: error,
    });
  }
};
