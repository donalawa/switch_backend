const mongoose = require("mongoose");

const SiteImages = new mongoose.Schema({
    logoImgUrl: String,
    siteBgImgUrl: String
})

module.exports = mongoose.model("SiteImages", SiteImages);