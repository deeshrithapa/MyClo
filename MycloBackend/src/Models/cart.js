const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  size: { type: String, required: true },
  color: { type: String, required: true },
  shoulderType: { type: String, default: 'not cutsomized' },
  pockets: { type: String, default: 'not cutsomized' },
  hem: { type: String, default: 'not cutsomized' },
  vents: { type: String, default: 'not cutsomized' },
});

const CartSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [CartItemSchema],
}, { timestamps: true });

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
