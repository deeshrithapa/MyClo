const express = require('express');
const createCategory = require('../Controllers/categoryController');
const router = express.Router();

// Route to create category
router.post('/createCategory', createCategory);

module.exports = router;
