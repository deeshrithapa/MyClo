const CartItem = require('../Models/cartItem');

// Helper function to send error responses
const sendErrorResponse = (res, error) => {
  res.status(500).json({ msg: error.message });
};

// Get all cart items
const getAllCartItems = async (req, res) => {
  try {
    const cartItems = await CartItem.find().populate('cart').populate('product');
    res.status(200).json({ cartItems });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Get a cart item by ID
const getCartItemById = async (req, res) => {
  try {
    const cartItem = await CartItem.findById(req.params.id).populate('cart').populate('product');
    if (!cartItem) {
      return res.status(404).json({ msg: "Cart item not found" });
    }
    res.status(200).json({ cartItem });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Create a new cart item
const createCartItem = async (req, res) => {
  try {
    const { cart, product, quantity } = req.body;
    const cartItem = new CartItem({ cart, product, quantity });
    await cartItem.save();
    res.status(201).json({ cartItem });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Update a cart item by ID
const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const cartItem = await CartItem.findByIdAndUpdate(
      req.params.id,
      { quantity },
      { new: true, runValidators: true }
    ).populate('cart').populate('product');
    if (!cartItem) {
      return res.status(404).json({ msg: "Cart item not found" });
    }
    res.status(200).json({ cartItem });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Delete a cart item by ID
const deleteCartItem = async (req, res) => {
  try {
    const cartItem = await CartItem.findByIdAndDelete(req.params.id);
    if (!cartItem) {
      return res.status(404).json({ msg: "Cart item not found" });
    }
    res.status(200).json({ msg: "Cart item deleted successfully" });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

module.exports = {
  getAllCartItems,
  getCartItemById,
  createCartItem,
  updateCartItem,
  deleteCartItem,
};
