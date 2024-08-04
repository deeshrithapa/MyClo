const mongoose = require('mongoose');
const { Schema } = mongoose;

const Product = mongoose.model('Product', new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
  colors: [{
    type: Schema.Types.ObjectId,
    ref: 'Color',
  }],
  sizes: [{
    type: Schema.Types.ObjectId,
    ref: 'Size',
  }],
}));

module.exports = Product;
