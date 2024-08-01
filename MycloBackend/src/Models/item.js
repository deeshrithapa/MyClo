const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemSchema = new Schema({
  name: {
    type: String,
    required: [true, "Item name is required"],
  },
  description: {
    type: String,
    required: [true, "Item description is required"],
  },
  price: {
    type: Number,
    required: [true, "Item price is required"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
