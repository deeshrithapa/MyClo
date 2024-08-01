const mongoose = require("mongoose");
const { Schema } = mongoose;

const measurementSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  measurements: {
    type: Map,
    of: Number,
    required: [true, "Measurements are required"],
  },
});

const Measurement = mongoose.model("Measurement", measurementSchema);

module.exports = Measurement;
