const Order = require('../Models/order');
const Cart = require('../Models/cart');


exports.placeOrder = async (req, res) => {
  try {
    const { contactInfo, shippingAddress } = req.body;
    const userId = req.user.id;

    // Create and save the order
    const order = new Order({
      user: userId,
      cart: req.user.cart, // Assuming cart items are stored in user session or similar
      contactInfo,
      shippingAddress,
      paymentMethod: 'cash',
    });

    await order.save();

    // Clear the cart after the order is placed
    await Cart.findOneAndDelete({ user: userId });

    res.status(201).json(order);
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Error placing order' });
  }
};


exports.completePurchase = async (req, res) => {
  try {
    const { contactInfo, shippingAddress, cardDetails } = req.body;
    const userId = req.user.id;

    // Create and save the order
    const order = new Order({
      user: userId,
      cart: req.user.cart, // Assuming cart items are stored in user session or similar
      contactInfo,
      shippingAddress,
      paymentMethod: 'card',
      cardDetails,
    });

    await order.save();

    // Clear the cart after the order is placed
    await Cart.findOneAndDelete({ user: userId });

    res.status(201).json(order);
  } catch (error) {
    console.error('Error completing purchase:', error);
    res.status(500).json({ message: 'Error completing purchase' });
  }
};

