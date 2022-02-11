const express = require("express");
const improoveController = require("../controllers/improveController");
const verifyRoleMidleware = require("../midlewares/authjwt");

const improoveRouter = express.Router();

improoveRouter.post("/suggestion",[verifyRoleMidleware.verifyToken, verifyRoleMidleware.isAdmin], improoveController.newSuggestion);

improoveRouter.get("/suggestions",[verifyRoleMidleware.verifyToken, verifyRoleMidleware.isSuperAdmin], improoveController.allSuggestions);


module.exports = improoveRouter;