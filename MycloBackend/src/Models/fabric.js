const mongoose = require("mongoose");
const { Schema } = mongoose;

const fabricSchema = new Schema({
  name: {
    type: String,
    required: [true, "Fabric name is required"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Fabric description is required"],
  },
  price: {
    type: Number,
    required: [true, "Fabric price is required"],
  },
});

const Fabric = mongoose.model("Fabric", fabricSchema);

module.exports = Fabric;
