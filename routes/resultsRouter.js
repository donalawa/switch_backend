/**
* Register all the question routes and point them to their various controllers {@link link
    name}
    * @author Donacien
    * @date 09/2/2022
    * Contributors : 
**/

const express = require('express');
const resultsController = require('../controllers/resultsController');
const resultsRouter = express.Router();
const verifyMidleWare = require('../midlewares/authjwt');
// REGISTER ALL ROUTES HERE
resultsRouter.post("/results", resultsController.createResult);

resultsRouter.get('/all/results',[verifyMidleWare.verifyToken, verifyMidleWare.isAdmin], resultsController.getAllResults)

resultsRouter.get("/result/:id", resultsController.getResultById);

resultsRouter.get("/results/:calcId", resultsController.getResultsForCalc);

resultsRouter.delete('/result/:resultId',[verifyMidleWare.verifyToken, verifyMidleWare.isAdmin],resultsController.deleteResult);


module.exports = resultsRouter;