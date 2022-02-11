/**
* Register all the answer routes and point them to their various controllers {@link link
    name}
    * @author Donacien
    * @date 23/12/2021
    * Contributors : 
**/

const express = require('express');
const verifyUserMidleWare = require('../midlewares/index')
const answersRouter = express.Router();
const verifyRoleMidleware = require("../midlewares/authjwt");

const answerController = require('../controllers/answersController');

/**
 * For creating a new answer for a question only accesible by the admin
 * post request.
 * Endpoint: /answer
 * @param {string} questionId this is the id of the question having the answer
 * @param {string} answerText this is the answer text
 * @param {string} description is a short description explaining this answer
 * @return {Object} this will return an object after submiting containing the success message
 **/
answersRouter.post('/answers',[verifyRoleMidleware.verifyToken, verifyRoleMidleware.isAdmin], answerController.addNewAnswer);

answersRouter.post("/answer/:answerId", [verifyRoleMidleware.verifyToken, verifyRoleMidleware.isAdmin], answerController.updateAnswer);

answersRouter.get('/answers/:questionId',[verifyRoleMidleware.verifyToken, verifyRoleMidleware.isAdmin], answerController.getQuestionAnswers);

answersRouter.delete("/answer/:answerId", [verifyRoleMidleware.verifyToken, verifyRoleMidleware.isAdmin], answerController.deleteAnswer)

module.exports = answersRouter;