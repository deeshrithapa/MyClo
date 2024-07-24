const mongoose = require('mongoose');
const { Schema } = mongoose;

const fabricSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    pricePerYard: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Fabric = mongoose.model("Fabric", fabricSchema);
module.exports = Fabric;
