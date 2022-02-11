/**
* Description of the file. Add link pointers with {@link link
    name}
    * @author Donacien
    * @date 24/12/2021
    * Contributors : contributor name,
**/

const mongoose = require('mongoose');


const AnswersSchema = new mongoose.Schema({
    optionText_En: String,
    optionDesc_En: String,
    optionText_Fr: String,
    optionDesc_Fr: String,
    optionTime: Number,
    optionCost: Number,
    optionIcon: String,
    questionId: mongoose.Schema.Types.ObjectId,
    nextQuestionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null
    }
},{ timestamps: true })

module.exports = mongoose.model('Answer', AnswersSchema);