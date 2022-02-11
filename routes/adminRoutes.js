/**
* Register all the admin routes and point them to their various controllers {@link link
    name}
    * @author Donacien
    * @date 23/12/2021
    * Contributors : 
**/

const express = require('express');
const adminController = require('../controllers/adminController');
const verifyMidleware = require('../midlewares/index');
const verifyRoleMidleware = require("../midlewares/authjwt");

const adminRouter = express.Router();


/**
 * For creating a new admin or registering a new admin
 * post request.
 * Endpoint: /admin
 * @param {string} username this is the name of the admin
 * @param {string} email this is the email of the admin
 * @param {password} this is the admin's password
 * 
 * @return {Object} this will return an object after registration containing the success message
 **/

adminRouter.post('/admin', [verifyMidleware.verifySignUp.checkDuplicateUsernameOrEmail, verifyMidleware.verifySignUp.checkRolesExisted], adminController.signup);


module.exports = adminRouter;