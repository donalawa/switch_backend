const express = require("express");
const contactController = require("../controllers/supportController");
const verifyRoleMidleware = require("../midlewares/authjwt");

const contactRouter = express.Router();


contactRouter.post("/contact/new",[verifyRoleMidleware.verifyToken, verifyRoleMidleware.isAdmin], contactController.newContact)

contactRouter.get("/contacts",[verifyRoleMidleware.verifyToken, verifyRoleMidleware.isSuperAdmin], contactController.getAllContacts)

contactRouter.get("/user/contacts",[verifyRoleMidleware.verifyToken, verifyRoleMidleware.isAdmin], contactController.getUsersContacts);

module.exports = contactRouter;