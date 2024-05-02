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
  const { id } = req.params;
  const { newName, img } = req.body;

  const doctor = req.user.role;
  const spesialkategori = true;
  if (doctor !== "dokter" && spesialkategori) {
    return res.status(403).json({
      message: "access denied",
    });
  }

  try {
    // Temukan paket berdasarkan ID
    const packages = await Package.findById(id);

    // Jika paket tidak ditemukan, kembalikan respons 404
    if (!packages) {
      return res.status(404).json({
        message: "Package not found",
      });
    }

    // Perbarui data paket jika data baru disediakan dalam req.body
    if (newName) {
      packages.name = newName;
    }
    if (img) {
      packages.img = img;
    }

    // Simpan perubahan pada paket
    await packages.save();

    // Kembalikan respons berhasil dengan data paket yang diperbarui
    res.status(200).json({
      message: "Package updated successfully",
      data: packages,
    });
  } catch (error) {
    // Tangani kesalahan server
    res.status(500).json({ message: error.message });
  }
};

exports.deletePackage = async (req, res) => {
  const id = req.params.id;

  const doctor = req.user.role;
  const spesialkategori = true;
  if (doctor !== "dokter" && spesialkategori) {
    return res.status(403).json({
      message: "access denied",
    });
  }

  try {
    const deletedPackage = await Package.findByIdAndDelete(id);

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

exports.getPackageByName = async (req, res) => {
  const id = req.params.id;

  const doctor = req.user.role;
  const spesialkategori = true;
  if (doctor !== "dokter" && spesialkategori) {
    return res.status(403).json({
      message: "access denied",
    });
  }

  try {
    const packages = await Package.findById(id);
    if (!packages || packages.length === 0) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.status(200).json(packages);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
