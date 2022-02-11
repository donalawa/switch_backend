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

// REGISTER ALL ROUTES HERE
resultsRouter.post("/results", resultsController.createResult);


module.exports = resultsRouter;