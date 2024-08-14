const Cart = require('../Models/cart');
// const CartItem = require('../Models/cartItem');

const sendErrorResponse = (res, error) => {
  res.status(500).json({ msg: error.message });
};

const getCartByUserId = async (req, res) => {
  try {
    const userId = req.params.userId; // Get user ID from the request parameters

    // Fetch the cart for the specified user ID
    const cart = await Cart.findOne({ user: userId })
      .populate({
        path: 'items.product',
        select: 'name price productImage',
      });

    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    return res.status(200).json({ msg: "Cart fetched successfully", cart });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};




const createNewCart = async (req, res) => {
  try {
    const { product, quantity, size, color, shoulderType, pockets, hem, vents } = req.body;
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({ msg: "User ID not found" });
    }

    // Find the cart for the user
    let cart = await Cart.findOne({ user: userId });

    const newCartItem = {
      product,
      quantity,
      size,
      color,
      shoulderType: shoulderType || 'not customized',
      pockets: pockets || 'not customized',
      hem: hem || 'not customized',
      vents: vents || 'not customized'
    };

    if (cart) {
      // If the cart exists, add the new item to the cart
      cart.items.push(newCartItem);
      await cart.save();
    } else {
      // If the cart does not exist, create a new one
      cart = new Cart({ user: userId, items: [newCartItem] });
      await cart.save();
    }

    // Send back the newly added item
    const newItem = cart.items[cart.items.length - 1];
    res.status(200).json({ cartItem: newItem });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};





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

const removeItemFromCart = async (req, res) => {
  try {
    const { itemId } = req.body;
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    // Remove the item from the cart
    cart.items = cart.items.filter(item => item._id.toString() !== itemId);
    await cart.save();

    res.status(200).json({ msg: "Item removed successfully", cart });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  getCartByUserId,
  createNewCart,
  deleteCartByUserId,
  removeItemFromCart, // Export the new function
};
