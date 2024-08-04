const Cart = require('../Models/cart');
const CartItem = require('../Models/cartItem');

// Helper function to send error responses
const sendErrorResponse = (res, error) => {
  res.status(500).json({ msg: error.message });
};

// Get a cart by user ID
const getCartByUserId = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items');
    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
    }
    res.status(200).json({ cart });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Create or update a cart
const createOrUpdateCart = async (req, res) => {
  try {
    const { items } = req.body;
    let cart = await Cart.findOne({ user: req.user.id });
    
    if (cart) {
      cart.items = items;
      cart = await cart.save();
    } else {
      cart = new Cart({ user: req.user.id, items });
      await cart.save();
    }

    res.status(200).json({ cart });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Delete a cart by user ID
const deleteCartByUserId = async (req, res) => {
  try {
    const cart = await Cart.findOneAndDelete({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
    }
    res.status(200).json({ msg: "Cart deleted successfully" });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

module.exports = {
  getCartByUserId,
  createOrUpdateCart,
  deleteCartByUserId,
};
