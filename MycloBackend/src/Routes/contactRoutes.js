const express = require('express');
const router = express.Router();
const { createContactMessage } = require('../Controllers/contactController');
const authenticate = require('../Middleware/authMiddleware');

// Route to handle contact form submissions
router.post('/create', authenticate, createContactMessage);

module.exports = router;
