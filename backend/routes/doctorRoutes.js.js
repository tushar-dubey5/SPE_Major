const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment'); // Replace with your actual model path
const Patient = require('../models/Patient');
const Report = require('../models/Report')



// routes/doctor.js
router.get('/:doctorId/appointments', async (req, res) => {
    try {
      const appointments = await Appointment.find({ doctorId: req.params.doctorId })
        .populate('patientId', 'name email'); // Get patient details
  
      res.json(appointments);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  });

  
  router.get('/patient/:patientId/history', async (req, res) => {
    try {
      const patient = await Patient.findById(req.params.patientId);
      const reports = await Report.find({ patientId: req.params.patientId });
  
      res.json({ patient, reports });
    } catch (err) {
      res.status(500).json({ error: 'Could not fetch history' });
    }
  });

  router.post('/analyze/:patientId', async (req, res) => {
    const mockRisk = ['Low', 'Moderate', 'High'][Math.floor(Math.random() * 3)];
    
    res.json({
      diagnosis: 'Heart attack prediction model result',
      riskLevel: mockRisk,
      recommendedTests: '',
      medications: '',
      lifestyleAdvice: '',
    });
  });

  
  router.post('/report/:patientId', async (req, res) => {
    const { doctorId, diagnosis, riskLevel, recommendedTests, medications, lifestyleAdvice } = req.body;
  
    try {
      const newReport = new Report({
        doctorId,
        patientId: req.params.patientId,
        diagnosis,
        riskLevel,
        recommendedTests,
        medications,
        lifestyleAdvice,
      });
  
      await newReport.save();
      res.status(201).json({ message: 'Report submitted to patient', report: newReport });
    } catch (err) {
      res.status(500).json({ error: 'Error generating report' });
    }
  });
  
  module.exports = router;