const mongoose = require('mongoose');
const { Schema } = mongoose;

const appointmentSchema = new Schema({
  patientId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
  specialty: { type: String},
  time: { type: String, required: true },
  day: { type: String, required: true },
  status: { type: String, required: true, enum: ['pending', 'started', 'finish'] },
  type: { type: String },
  package: { type: String},
  isApproved: { type: Boolean, default: false },
  link_gmeet: { type: String }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
