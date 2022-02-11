const mongoose = require("mongoose");
const Answers = require("./Answers");

const Question = new mongoose.Schema({
    questionText_En: String,
    questionText_Fr: String,
    calculatorId: mongoose.Schema.Types.ObjectId,
    options: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Answer"
        }
    ]
},{ timestamps: true })

Question.pre("remove", function(next){
    Answers.remove({questionId: this._id}).exec();

    next();
})
module.exports = mongoose.model("Question", Question);