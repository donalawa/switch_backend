/**
* Register all the user routes and point them to their various controllers {@link link
    name}
    * @author Donacien
    * @date 23/12/2021
    * Contributors : 
**/

const express = require('express');
const userController = require('../controllers/userController');
const verifyMidleware = require('../midlewares/index');
const tokenMidleWare = require("../midlewares/authjwt");

const userRouter = express.Router();

// REGISTER ALL ROUTES HERE

/**
 * For creating a new admin or registering a new admin
 * @api {post} request.
 * @api {Endpoint} /admin/register
 * 
 * @apiSuccess (201) {Object} data created user and message
 * @apiVersion 1.1.0
 **/
userRouter.post("/user/signup",[verifyMidleware.verifySignUp.checkDuplicateUsernameOrEmail, verifyMidleware.verifySignUp.checkRolesExisted], userController.signup);


/**
 * For creating a new admin or registering a new admin
 * @api {post} request.
 * @api {Endpoint} /admin/login
 * 
 * @apiSuccess (200) {Object} token, username, email, role, id, status
 * @apiPermission Admin
 * @apiVersion 1.1.0
 **/
userRouter.post("/user/login", userController.signin);

/**
 * For updating admin profile and adding profile picture url
 * @api {post} request.
 * @api {Endpoint} /admin/update
 * 
 * @apiSuccess (200) {Object} token, username, email, role, id, status
 * @apiPermission Admin
 * @apiVersion 1.1.0
 **/

userRouter.post("/user/update",[tokenMidleWare.verifyToken, tokenMidleWare.isAdmin], userController.updateUser);



module.exports = userRouter;