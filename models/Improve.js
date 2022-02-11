const mongoose = require("mongoose");

const Improove = new mongoose.Schema({
    name: String,
    email: String,
    suggesstion: String
},{ timestamps: true })


module.exports = mongoose.model("Improove", Improove);