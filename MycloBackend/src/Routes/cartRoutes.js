const express = require('express');
const router = express.Router();
const cartController = require('../Controllers/cartController');
const auth = require('../Middleware/authMiddleware');

router.get('/', auth, cartController.getCartByUserId);
router.post('/', auth, cartController.createOrUpdateCart);
router.delete('/', auth, cartController.deleteCartByUserId);

module.exports = router;
