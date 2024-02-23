const mongoose = require("mongoose");

const secretSchema = new mongoose.Schema({
    secret: {
        type: String,
        required: true
    },
    timeStamp: {
        type: Date,
        default: Date.now
    },
});

const Secret = mongoose.model('SECRET', secretSchema);

module.exports = Secret;