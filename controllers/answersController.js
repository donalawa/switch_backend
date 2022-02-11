const Answers = require('../models/Answers');
const Question = require('../models/Questions');

exports.addNewAnswer = async(req,res) => {
    try {
        console.log("REQUEST TO ADD ANSWER")
        console.log(req.body)
        let optionText_En = req.body.optionText_En;
        let optionDesc_En = req.body.optionDesc_En;
        let optionTime = req.body.optionTime;
        let optionCost = req.body.optionCost;
        let questionId = req.body.questionId;



        let newAnswer = await Answers.create({optionText_En, optionDesc_En, optionTime, optionCost, questionId});

        await Question.updateOne(
            {
                _id: questionId
            },
            {
                $push: {options: newAnswer._id}
            }
        )

        console.log("AFTER PUSHING");

        return res.status(200).send({message: "Added Option"})
    } catch (error) {
        return res.status(500).send({message: "There was an error"})
    }
}

exports.getQuestionAnswers = async (req,res) => {
    try {
        let questionId = req.params.questionId;

        let data = await Answers.find({questionId: questionId});

        return res.status(200).send({message: "All Options", data: data});

    } catch (error) {
        
    }
}

exports.setNexQuestion = (req,res) => {
    try {
        
    } catch (error) {
        
    }
}

exports.updateAnswer = async (req,res) => {
    try {
        console.log("TRYING TO UPDATE ANSWER")
        console.log(req.body)
        let optionId = req.params.answerId;
        let optionText_En = req.body.optionText_En;
        let optionDesc_En = req.body.optionDesc_En;
        let optionTime = req.body.optionTime;
        let optionCost = req.body.optionCost;
        let questionId = req.body.questionId;

        await Answers.update(
            {
                "_id": optionId
            },
            {
                "$set": {optionText_En, optionDesc_En, optionTime, optionCost}
            }
        );

        return res.status(200).send({message: "Option Updated"})

    } catch (error) {
        
    }
}

exports.getAnswerById = (req,res) => {
    try {
        
    } catch (error) {
        
    }
}

exports.deleteAnswer = async (req,res) => {
    try {
        let id = req.params.answerId;

        await Answers.deleteOne({_id: id});

        return res.status(200).send({message: "Answer Deleted"})

    } catch (error) {
        return res.status(500).send({error: error})
    }
}