const mongoose = require("mongoose");
const Questions = require("./Questions");

const Calculator = new mongoose.Schema({
    name: String,
    description: String,
    notificationEmail: String,
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    hasTheme: {
        type: Boolean,  
        default: false
    }
},{ timestamps: true })

Calculator.pre("remove", function(next){
    Questions.remove({calculatorId: this._id}).exec();
    next();
})

module.exports = mongoose.model("Calculator", Calculator);