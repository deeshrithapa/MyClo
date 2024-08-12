const express = require('express');
const router = express.Router();
const Cart = require('../Models/cart');
const authMiddleware = require('../Middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
    }
    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/add', async (req, res) => {
  const { productId, quantity, size, color } = req.body;
  const userId = req.user.id;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(item => item.product.toString() === productId && item.size === size && item.color === color);

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity, size, color });
    }

    await cart.save();
    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
