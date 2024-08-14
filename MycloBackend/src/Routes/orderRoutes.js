const express = require('express');
const { placeOrder, completePurchase } = require('../Controllers/orderController');
const authenticate = require('../Middleware/authMiddleware');
const router = express.Router();

router.post('/place-order', authenticate, placeOrder);
router.post('/complete-purchase', authenticate, completePurchase);

module.exports = router;
