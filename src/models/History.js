const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historySchema = new Schema({
    patientId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
    specialty: { type: String},
    time: { type: String, required: true },
    day: { type: String, required: true },
    status: { type: String, enum: ['pending', 'started', 'finish'] },
    type: { type: String},
    link_gmeet: { type: String },
    package: {type: String},
    createdAt: { type: Date, default: Date.now }  
});

const History = mongoose.model('History', historySchema);
module.exports = History;
