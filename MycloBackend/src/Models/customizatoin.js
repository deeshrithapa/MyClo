const mongoose = require('mongoose');
const { Schema } = mongoose;

const customizationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  shoulderType: {
    type: String,
    enum: ['Standard', 'Roped', 'Soft'],
  },
  pockets: {
    type: String,
    enum: ['Patch Pocket', 'Pocket Flaps'],
  },
  hem: {
    type: String,
    enum: ['Cuff', 'Blind Hem'],
  },
  vents: {
    type: String,
    enum: ['One', 'Two', 'None'],
  },
  
});

const Customization = mongoose.model('Customization', customizationSchema);

module.exports = Customization;
