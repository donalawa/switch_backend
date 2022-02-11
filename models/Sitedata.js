const mongoose = require("mongoose");

const SiteData = new mongoose.Schema({
    calculatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Calculator",
        required: true
    },
    title_en: String,
    description_en: String,
    title_fr: String,
    description_fr: String,
    facebookUrl: String,
    twitterUrl: String,
    linkedin: String,
    secondaryColor: String,
    primaryColor: String,
    logoImgUrl: String,
    bgImgUrl: String,
    calcLinkId: String,
    calcEmail: String,
    calcPhone: String
},{ timestamps: true });


module.exports = mongoose.model("SiteData", SiteData);