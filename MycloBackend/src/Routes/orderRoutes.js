const express = require('express');
const createOrder = require('../Controllers/orderController');
const router = express.Router();

// Route to create order
router.post('/createOrder', createOrder);

module.exports = router;
