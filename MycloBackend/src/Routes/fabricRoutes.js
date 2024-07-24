const express = require('express');
const createFabric = require('../Controllers/fabricController');
const router = express.Router();

// Route to create fabric
router.post('/createFabric', createFabric);

module.exports = router;
