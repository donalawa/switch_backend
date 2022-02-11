/**
* Description of the file. Add link pointers with {@link link
    name}
    * @author Donacien
    * @date 24/12/2021
    * Contributors : contributor name,
**/

const mongoose = require('mongoose');


const AnswersSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    message: String,
    calculatorId: mongoose.Schema.Types.ObjectId,
    clientPandT: {
        time: {type: String},
        cost: {type: Number}
    },
    clientOptions: [
        {
            questionId: {type: mongoose.Schema.Types.ObjectId},
            options: [
                {type: mongoose.Schema.Types.ObjectId}
            ]
        }
    ]
},{ timestamps: true })

module.exports = mongoose.model('Results', AnswersSchema);