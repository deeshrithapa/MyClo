const express = require('express');
const router = express.Router();
const sizeController = require('../Controllers/sizeController');

// Create a new size
router.post('/create', sizeController.createSize);

// Get all sizes
router.get('/', sizeController.getAllSizes);

// Get a size by ID
router.get('/:id', sizeController.getSizeById);

// Update a size by ID
router.put('/:id', sizeController.updateSize);

// Delete a size by ID
router.delete('/:id', sizeController.deleteSize);

module.exports = router;
