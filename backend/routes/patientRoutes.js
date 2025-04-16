const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment'); // Replace with your actual model path
const Patient = require('../models/Patient');
const Report = require('../models/Report')
// make sure path is correct

router.post('/create/appointment', async (req, res) => {
  try {
    const { patientId, doctorId, date, reason } = req.body;

    const newAppointment = new Appointment({
      patientId,
      doctorId,
      date,
      reason, // Include reason in the document
    });

    await newAppointment.save();

    res.json({ message: 'Appointment booked successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to book appointment' });
  }
});

router.get('/:patientId/reports', async (req, res) => {
    try {
      const reports = await Report.find({ patientId: req.params.patientId })
        .populate('doctorId', 'name email'); // Optional: get doctor details too
  
      res.json(reports);
    } catch (err) {
      console.error('Error fetching reports:', err);
      res.status(500).json({ error: 'Failed to fetch reports' });
    }
  });
  
module.exports = router;