const express = require('express');
const router = express.Router();
const cartItemController = require('../Controllers/cartItemController');

router.get('/', cartItemController.getAllCartItems);
router.get('/:id', cartItemController.getCartItemById);
router.post('/', cartItemController.createCartItem);
router.put('/:id', cartItemController.updateCartItem);
router.delete('/:id', cartItemController.deleteCartItem);

module.exports = router;
