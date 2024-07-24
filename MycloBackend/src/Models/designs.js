const mongoose = require('mongoose');
const { Schema } = mongoose;

const designSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    fabric: {
        type: Schema.Types.ObjectId,
        ref: 'Fabric',
        required: true
    },
    designDetails: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Design = mongoose.model("Design", designSchema);
module.exports = Design;
