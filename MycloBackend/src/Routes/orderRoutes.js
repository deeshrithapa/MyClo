const express = require('express');
const createProduct = require('../Controllers/productController');
const router = express.Router();

// Route to create product
router.post('/createProduct', createProduct);

module.exports = router;
