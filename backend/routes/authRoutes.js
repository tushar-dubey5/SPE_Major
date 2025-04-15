// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/authController');

// POST /api/auth/login – log in as doctor or patient
router.post('/login', login);

// POST /api/auth/register – registration endpoint (optional for testing)
router.post('/register', register);

module.exports = router;
