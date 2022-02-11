const mongoose = require("mongoose");

const Support = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    description: String,
    issue_category: String,
    imgUrl: String,
    ownerEmail: String
},{ timestamps: true })


module.exports = mongoose.model("Support", Support);