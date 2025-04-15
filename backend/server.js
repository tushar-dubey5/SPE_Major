// backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes');
const doctorRoutes = require('./routes/doctorRoutes.js') 
const patientRoutes = require('./routes/patientRoutes.js') // ✅ correct import and spelling


const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// Use authentication routes
app.use('/api/auth', authRoutes);

//Doctors Routes
app.use('/api/doctor', doctorRoutes); 

app.use('/api/patient', patientRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
