/**
* Register all the question routes and point them to their various controllers {@link link
    name}
    * @author Donacien
    * @date 23/12/2021
    * Contributors : 
**/

const express = require('express');
const questionController = require('../controllers/questionController');
const verifyRoleMidleware = require("../midlewares/authjwt");
const questionRouter = express.Router();

// REGISTER ALL ROUTES HERE
questionRouter.post("/questions",[verifyRoleMidleware.verifyToken, verifyRoleMidleware.isAdmin], questionController.createQuestion);

questionRouter.get("/question/:questionId",[verifyRoleMidleware.verifyToken, verifyRoleMidleware.isAdmin],questionController.getQuestionById);

questionRouter.get("/questions/:calculatorId",[verifyRoleMidleware.verifyToken, verifyRoleMidleware.isAdmin],questionController.getAllQuestions);

// CLIENT GET QUESTIONS
questionRouter.get("/calculator/client/questions/:calculatorId",questionController.getAllQuestionsClient);

questionRouter.post("/question/:questionId",[verifyRoleMidleware.verifyToken, verifyRoleMidleware.isAdmin],questionController.updateQuestion);

questionRouter.delete("/question/:questionId",[verifyRoleMidleware.verifyToken, verifyRoleMidleware.isAdmin], questionController.deleteQuestion);

module.exports = questionRouter;