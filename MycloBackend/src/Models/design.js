const mongoose = require("mongoose");
const { Schema } = mongoose;

const designSchema = new Schema({
  name: {
    type: String,
    required: [true, "Design name is required"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Design description is required"],
  },
  imageUrl: {
    type: String,
    required: [true, "Design image URL is required"],
  },
});

const Design = mongoose.model("Design", designSchema);

module.exports = Design;
