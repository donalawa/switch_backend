/**
* Register all the site editing routes and point them to their various controllers {@link link
    name}
    * @author Donacien
    * @date 23/12/2021
    * Contributors : 
**/

const express = require('express');
const siteRouter = express.Router();
const siteDataController = require('../controllers/siteDataController');
const verifyRoleMidleware = require("../midlewares/authjwt");

// REGISTER ALL ROUTES HERE
siteRouter.post("/calculator/theme/delete",[verifyRoleMidleware.verifyToken, verifyRoleMidleware.isAdmin], siteDataController.deleteInfo)

siteRouter.post("/calculator/theme/:calculatorId",[verifyRoleMidleware.verifyToken, verifyRoleMidleware.isAdmin], siteDataController.createSiteData);

siteRouter.post("/calculator/theme/update/:themeId",[verifyRoleMidleware.verifyToken, verifyRoleMidleware.isAdmin], siteDataController.updateSiteData);

siteRouter.get("/calculator/theme/:calculatorId",[verifyRoleMidleware.verifyToken, verifyRoleMidleware.isAdmin], siteDataController.getSiteData)

siteRouter.get("/calculator/client/:short_url", siteDataController.getSiteDataByShortUrl);

module.exports = siteRouter;