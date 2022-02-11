/**
* Register all the calculator routes and point them to their various controllers {@link link
    name}
    * @author Donacien
    * @date 25/12/2021
    * Contributors : 
**/


const express = require("express");
const calculatorController = require("../controllers/calculatorController");
const verifyRoleMidleware = require("../midlewares/authjwt");

const calculatorRouter = express.Router();

/**
 * For creating a new calculator by the admin
 * @api {post} request.
 * @api {Endpoint} /calculator
 * 
 * @apiSuccess (201) {Object} Success message in object
 * @apiVersion 1.1.0
 **/
calculatorRouter.post("/calculator/create",[verifyRoleMidleware.verifyToken, verifyRoleMidleware.isAdmin], calculatorController.createCalculator);

/**
 * For updating a calculator
 * @api {post} request.
 * @api {Endpoint} /calculator/:calculatorId
 * 
 * @apiSuccess (201) {Object} Success message in object
 * @apiVersion 1.1.0
 **/
calculatorRouter.post("/calculator/:calculatorId",[verifyRoleMidleware.verifyToken, verifyRoleMidleware.isAdmin],calculatorController.updateCalculator);

/**
 * For getting a single calculator by it's id
 * @api {get} request.
 * @api {Endpoint} /calculator/:calculatorId
 * 
 * @apiSuccess (201) {Object} Success message in object
 * @apiVersion 1.1.0
 **/
calculatorRouter.get("/calculator/:calculatorId",[verifyRoleMidleware.verifyToken, verifyRoleMidleware.isAdmin],calculatorController.getCalculatorById);


// OPEN ROUTE FOR CLIENT 
calculatorRouter.get("/calculator/client/info/:calculatorId",calculatorController.getCalculatorByIdClient);

/**
 * For getting a single all calculators with theme
 * @api {get} request.
 * @api {Endpoint} /calculator/:calculatorId
 * 
 * @apiSuccess (201) {Object} Success message in object
 * @apiVersion 1.1.0
 **/
 calculatorRouter.get("/calculators/theme",[verifyRoleMidleware.verifyToken, verifyRoleMidleware.isAdmin],calculatorController.getCalculatorsWithTheme);


/**
 * For getting all calculators
 * @api {get} request.
 * @api {Endpoint} /calculators
 * 
 * @apiSuccess (201) {Object} Success message in object
 * @apiVersion 1.1.0
 **/
calculatorRouter.get("/calculators",[verifyRoleMidleware.verifyToken, verifyRoleMidleware.isAdmin],calculatorController.getAllCalculators);

/**
 * For deleting a calculator by it's ID
 * @api {delete} request.
 * @api {Endpoint} /calculator/:calculatorId
 * 
 * @apiSuccess (201) {Object} Success message in object
 * @apiVersion 1.1.0
 **/

calculatorRouter.delete("/calculator/:calculatorId",[verifyRoleMidleware.verifyToken, verifyRoleMidleware.isAdmin],calculatorController.deleteCalculator);


module.exports = calculatorRouter;