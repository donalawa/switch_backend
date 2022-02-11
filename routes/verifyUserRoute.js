/**
* Register all the verify user routes and point them to their various controllers {@link link
    name}
    * @author Donacien
    * @date 23/12/2021
    * Contributors : 
**/

const express = require('express');
const verifyUserController = require('../controllers/verifyUserController');

const verifyRouter = express.Router();

// REGISTER ALL ROUTES HERE
verifyRouter.get("/auth/verify/:confirmationCode", verifyUserController.verifyUser)

module.exports = verifyRouter;
