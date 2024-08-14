const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CartItem', required: true }],
  contactInfo: {
    name: String,
    email: String,
    phone: String
  },
  shippingAddress: {
    address: String,
    city: String
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card'],
    required: true
  },
  cardDetails: {
    cardNumber: String,
    expiryMonth: String,
    expiryYear: String,
    cvc: String
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
