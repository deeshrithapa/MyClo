const mongoose = require('mongoose');
const { Schema } = mongoose;

const sizeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
});

const Size = mongoose.model('Size', sizeSchema);

module.exports = Size;
