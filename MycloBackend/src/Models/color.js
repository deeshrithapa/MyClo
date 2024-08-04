const mongoose = require('mongoose');
const { Schema } = mongoose;

const colorSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  hexCode: {
    type: String,
    required: true,
  },
});

const Color = mongoose.model('Color', colorSchema);

module.exports = Color;
