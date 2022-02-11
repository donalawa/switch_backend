/**
* Register all the question routes and point them to their various controllers {@link link
    name}
    * @author Donacien
    * @date 26/12/2021
    * Contributors : 
**/

const express = require('express');
const changePasswordController = require('../controllers/changePasswordController');
const verifyRoleMidleware = require("../midlewares/authjwt");
const changePasswordRouter = express.Router();

// REGISTER ALL ROUTES HERE
changePasswordRouter.post("/change-password",[verifyRoleMidleware.verifyToken], changePasswordController.changePassword);

changePasswordRouter.post("/reset-password", changePasswordController.resetPassword);

changePasswordRouter.post("/new-password", changePasswordController.resetNewPassword);

module.exports = changePasswordRouter;