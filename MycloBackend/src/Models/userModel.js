const mongoose = require('mongoose');
const { Schema } = mongoose; //destructuring
// const Schema = mongoose.Schema
const userSchema = new Schema({
    name:{

        type: String,
        required: true
    },

    age:{

        type: Number,
        required: true
    },

    address:{

        type: String,
        required: true
    },

    phone:{

        type: Number,
        required: true
    },

    email:{
        type: String,
        required: true
    },

    date:{

        type: Date,
        default: Date.now
    },

    role:{

        type: String,
        enum: ['Admin', 'User']
    }  
});

