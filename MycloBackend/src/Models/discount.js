const mongoose = require("mongoose");
const { Schema } = mongoose;

const discountSchema = new Schema({
  code: {
    type: String,
    required: [true, "Discount code is required"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Discount description is required"],
  },
  discountPercentage: {
    type: Number,
    required: [true, "Discount percentage is required"],
  },
  validFrom: {
    type: Date,
    required: [true, "Valid from date is required"],
  },
  validUntil: {
    type: Date,
    required: [true, "Valid until date is required"],
  },
});

const Discount = mongoose.model("Discount", discountSchema);

module.exports = Discount;
