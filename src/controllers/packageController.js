const Package = require("../models/Package");

exports.createPackage = async (req, res) => {
  const { name, img } = req.body;
  const doctor = req.user.role;
  const spesialkategori = true;
  if (doctor !== "dokter" && spesialkategori) {
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
exports.updatePackage = async (req, res) => {
    const { name } = req.params; 
    const { newName, img } = req.body; 
  
    const doctorRole = req.user.role;
    const specialCategory = true; 
  
    try {
      
      if (doctorRole !== "dokter" && specialCategory) {
        return res.status(403).json({
          message: "Access denied",
        });
      }
  
      
      const updatedPackage = await Package.findOneAndUpdate({ name }, { name: newName, img }, { new: true });
  
      if (!updatedPackage) {
        return res.status(404).json({
          message: "Package not found",
        });
      }
  
      
      res.status(200).json({
        message: "Package updated successfully",
        data: updatedPackage,
      });
    } catch (error) {
      
      res.status(500).json({
        message: "Server error",
        serverMessage: error.message,
      });
    }
  };