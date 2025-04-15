const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  date: Date,
  reason: String,
  status: { type: String, default: 'Pending' },
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
