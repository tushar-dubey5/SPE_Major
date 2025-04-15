// backend/models/Patient.js
const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'patient' } 
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);
