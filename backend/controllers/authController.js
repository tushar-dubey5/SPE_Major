// backend/controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

exports.login = async (req, res) => {
  const { email, password, role } = req.body;
  
  try {
    // Select model based on role
    const Model = role === 'doctor' ? Doctor : Patient;
    const user = await Model.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });
    
    // Generate and send token
    const token = generateToken(user);
    res.status(200).json({ token, user: { id: user._id, email, role } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const Model = role === 'doctor' ? Doctor : Patient;
    const user = new Model({ name, email, password: hashedPassword, role });
    await user.save();
    
    const token = generateToken(user);
    res.status(201).json({ token, user: { id: user._id, email, role } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
