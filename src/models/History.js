const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historySchema = new Schema({
    patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
    specialtyId: { type: Schema.Types.ObjectId, ref: 'Specialty', required: true },
    time: { type: String, required: true },
    date: { type: String, required: true },
    status: { type: String, required: true, enum: ['pending', 'started', 'finished'] },
    type: { type: Schema.Types.ObjectId, ref: 'Consultation', required: true },
    package: { type: Schema.Types.ObjectId, ref: 'Package', required: true },
    createdAt: { type: Date, default: Date.now }  
});

const History = mongoose.model('History', historySchema);
module.exports = History;
