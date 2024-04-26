const mongoose = require('mongoose');
const { Schema } = mongoose;

const doctorSchema = new Schema({
  fullName: { type: String, required: true },
  nickname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  role: { type: String, default: 'dokter' },
  specialtyId: { type: Schema.Types.ObjectId, ref: 'Specialty' },
  schedule: [{
    day: { type: String, required: true },
    timeSlots: [{ start: String, end: String }]
  }],
  specialCategory: { type: Boolean, default: false }
});

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;
