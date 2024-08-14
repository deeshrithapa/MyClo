const Order = require('../Models/order');

exports.placeOrder = async (req, res) => {
  try {
    const { contactInfo, shippingAddress } = req.body;
    const order = new Order({
      user: req.user.id,
      cart: req.user.cart, // Assuming cart items are stored in user session or similar
      contactInfo,
      shippingAddress,
      paymentMethod: 'cash'        
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Error placing order' });
  }
};


exports.completePurchase = async (req, res) => {
  try {
    const { contactInfo, shippingAddress, cardDetails } = req.body;
    // Assuming the order has already been placed and cardDetails are being used to process payment
    // Here, you would typically integrate with a payment gateway
    const order = new Order({
      user: req.user.id,
      cart: req.user.cart, // Assuming cart items are stored in user session or similar
      contactInfo,
      shippingAddress,
      paymentMethod: 'card',
      cardDetails
    });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error('Error completing purchase:', error);
    res.status(500).json({ message: 'Error completing purchase' });
  }
};
