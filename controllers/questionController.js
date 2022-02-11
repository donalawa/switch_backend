const Question = require("../models/Questions");
const Calculator = require("../models/Calculator");
const saveLogs = require('../utils/saveLog').saveLog;

exports.createQuestion = async (req,res) => {
    try {
        let lang = req.params.lang;
        let ownerId = req.userId;
        let calculatorId = req.body.calculatorId;
        
        let calc = await Calculator.findOne({_id: calculatorId});

    
        if(!calc.hasTheme) {
            return res.status(400).send({message: "Calculator must have a theme before you can add questions."});
        }
        // English
        let questionText_En = req.body.questionText_En;
        // French Content here
        let questionText_Fr = req.body.questionText_Fr;

        let question = new Question({
            questionText_En,
            questionText_Fr,
            calculatorId,
        })

        await question.save();

        saveLogs(`Created A New Question For ${calc.name} Calculator`, ownerId);
        return res.status(201).send({message: "Question Created"})
    } catch (error) {
        res.status(500).send({message: error});
    }
}

exports.getAllQuestions = async (req,res) => {
    try {
        console.log("BEFORE FINDING QUESTIONS");
        let calculatorId = req.params.calculatorId;
        let questions = await Question.find({calculatorId: calculatorId}).populate("options");
        console.log("AFTER FINDING QUESTIONS")
        return res.status(200).send({message: "All Questions", questions: questions});
    } catch (error) {
        return res.status(500).send({message: error});
    }
}


// CLIENT GET QUESTIONS
exports.getAllQuestionsClient = async (req,res) => {
    try {
        console.log("BEFORE FINDING QUESTIONS");
        let calculatorId = req.params.calculatorId;
        let questions = await Question.find({calculatorId: calculatorId}).populate("options");
        console.log("AFTER FINDING QUESTIONS")
        return res.status(200).send({message: "All Questions", questions: questions});
    } catch (error) {
        return res.status(500).send({message: error});
    }
}

exports.getQuestionById = async(req,res) => {
    try {
        let questionId = req.params.questionId;
        let question = await Question.findOne({_id: questionId}).populate("options");

        return res.status(200).send({message: "Question", question: question});
    } catch (error) {
        return res.status(500).send({message: error})
    }
}

exports.updateQuestion = async (req,res) => {
    try {
        let questionId = req.params.questionId;
        // English
        let questionText_En = req.body.questionText_En;
        // French Content here
        let questionText_Fr = req.body.questionText_Fr;
        let ownerId = req.userId;
        if(questionText_En) {
            await Question.update(
                {
                    "_id": questionId
                },
                {
                    $set: {questionText_En, questionText_En}
                }
            )
        }

        if(questionText_Fr) {
            await Question.update(
                {
                    "_id": questionId
                },
                {
                    $set: {questionText_Fr, questionText_Fr}
                }
            )
        }
        saveLogs(`Updated Question`, ownerId);
        return res.status(200).send({message: "Question Updated"})
    } catch (error) {
        return res.status(500).send({message: error});
    }
}


exports.deleteQuestion = async (req,res) => {
    try {
        let questionId = req.params.questionId;
        let qst = await Question.findOne({_id: questionId});
        let text = qst.questionText_En ? questionText_En : questionText_Fr;
        let ownerId = req.userId;
        await Question.remove({_id: questionId});
        saveLogs(`Deleted Question: ${text}`, ownerId);
        return res.status(200).send({message: "Question Deleted"})
    } catch (error) {
        return res.status(500).send({message: error})
    }
}