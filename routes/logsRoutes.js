const express = require("express");
const logsController = require("../controllers/Logs");
const verifyRoleMidleware = require("../midlewares/authjwt");

const logsRouter = express.Router();

logsRouter.get("/logs",[verifyRoleMidleware.verifyToken, verifyRoleMidleware.isAdmin], logsController.getAllLogs);

module.exports = logsRouter;