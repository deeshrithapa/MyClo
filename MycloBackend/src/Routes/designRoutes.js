const express = require('express');
const createDesign = require('../Controllers/designController');
const router = express.Router();

// Route to create design
router.post('/createDesign', createDesign);

module.exports = router;
