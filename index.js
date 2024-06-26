const express = require('express');
const connectDB = require('./src/config/db');
require('dotenv').config();
const authRoutes = require('./src/routes/authRoutes');
const doctorRoutes = require('./src/routes/doctorRoutes');
const specialtyRoutes = require('./src/routes/specialtyRoutes');
const appointmentRoutes = require('./src/routes/appointmentRoutes');
const userRoutes = require('./src/routes/profileRoutes'); 
const packageRoutes = require('./src/routes/packageRoutes');
const historyRoutes = require('./src/routes/historyRoutes');
const detailAppointments = require('./src/routes/detailAppointmentsRoutes');
const getAllSpecializedDoctors = require('./src/routes/allSpecialityDoctorRoutes');

const app = express();
app.use(express.json());
connectDB();

app.use('/api/auth',  authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/specialties', specialtyRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/profile', userRoutes);
app.use('/api/package', packageRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/appointments/details', detailAppointments);
app.use('/api/doctorspesialty', getAllSpecializedDoctors);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
