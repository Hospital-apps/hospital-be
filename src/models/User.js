const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    nickname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true ,unique: true },
    password: { type: String, required: true },
    isActive: { type: String, default: true },
    role: { type: String, default: 'pasien' }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
