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
  
    try {
      // Temukan paket berdasarkan nama
      const package = await Package.findOne({ name });
  
      // Jika paket tidak ditemukan, kembalikan respons 404
      if (!package) {
        return res.status(404).json({
          message: "Package not found",
        });
      }
  
      // Perbarui data paket
      package.name = newName;
      package.img = img;
  
      // Simpan perubahan pada paket
      await package.save();
  
      // Kembalikan respons berhasil dengan data paket yang diperbarui
      res.status(200).json({
        message: "Package updated successfully",
        data: package,
      });
    } catch (error) {
      // Tangani kesalahan server
      res.status(500).json({ message: error.message });
    }
  };

exports.deletePackage = async (req, res) => {
  const { name } = req.params;

  const doctor = req.user.role;
  const spesialkategori = true;
  if (doctor !== "dokter" && spesialkategori) {
    return res.status(403).json({
      message: "access denied",
    });
  }

  try {
    const deletedPackage = await Package.findOneAndDelete({ name });

    if (!deletedPackage) {
      return res.status(404).json({
        message: "Package not found",
      });
    }

    res.status(200).json({
      message: "Package deleted successfully",
      data: deletedPackage,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      serverMessage: error.message,
    });
  }
};

exports.getPackagesByName = async (req, res) => {
  const doctor = req.user.role;
  const spesialkategori = true;
  if (doctor !== "dokter" && spesialkategori) {
    return res.status(403).json({
      message: "access denied",
    });
  }
  try {
    const packages = await Package.findOne({ name: req.params.name });
    if (!packages) {
      return res.status(404).json({
        message: "Package not found",
      });
    }
    res.status(500).json({
      message: "package founded successfully",
      data: packages,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
