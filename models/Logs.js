const mongoose = require("mongoose");

const Logs = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    message: String,
    
}, { timestamps: true });

module.exports = mongoose.model('Logs', Logs);