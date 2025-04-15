const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  diagnosis: String,
  riskLevel: { type: String, enum: ['Low', 'Moderate', 'High'] },
  recommendedTests: String,
  medications: String,
  lifestyleAdvice: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Report', ReportSchema);
