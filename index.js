const express = require('express');
const connectDB = require('./src/config/db');
require('dotenv').config();
const authRoutes = require('./src/routes/authRoutes');
const doctorRoutes = require('./src/routes/doctorRoutes');
const specialtyRoutes = require('./src/routes/specialtyRoutes');
const appointmentRoutes = require('./src/routes/appointmentRoutes');
// const authenticate = require('./src/middleware/auth');


const app = express();
app.use(express.json());

connectDB();

app.use('/api/auth',  authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/specialties', specialtyRoutes);
app.use('/api/appointments', appointmentRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
