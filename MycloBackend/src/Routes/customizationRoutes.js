const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middleware/authMiddleware');
const customizationController = require('../Controllers/customizationController');

/**
 * @description Create a new customization
 * @route POST /api/customizations
 * @access Private
 */
router.post('/save', authMiddleware, customizationController.createCustomization);



module.exports = router;
