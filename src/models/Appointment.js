const mongoose = require('mongoose');
const { Schema } = mongoose;

const appointmentSchema = new Schema({
  patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
  specialtyId: { type: Schema.Types.ObjectId, ref: 'Specialty', required: true },
  time: { type: String, required: true },
  date: { type: String, required: true },
  status: { type: String, required: true, enum: ['pending', 'started', 'finish'] },
  type: { type: Schema.Types.ObjectId, ref: 'Consultation', required: true },
  package: { type: Schema.Types.ObjectId, ref: 'Package', required: true },
  isApproved: { type: Boolean, default: false },
  link_gmeet: { type: String }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
