const Sitedata = require("../models/Sitedata");
const Calculator = require('../models/Calculator');


exports.createSiteData = async (req,res) => {
    try {

        let calcId = req.params.calculatorId;
        let calc = await Calculator.findOne({_id: calcId});

        console.log("Found Calc")
        console.log(calc)
        if(calc.hasTheme) {
            return res.status(400).send({message: "Calculator already has a theme"});
        }

        console.log("After if check")

        let title_en = req.body.title_en;
        let description_en = req.body.description_en;
        let title_fr = req.body.title_fr;
        let description_fr = req.body.description_fr;
        let facebookUrl = req.body.facebookUrl;
        let twitterUrl = req.body.twitterUrl;
        let linkedin = req.body.linkedin;
        let secondaryColor = req.body.secondaryColor;
        let primaryColor = req.body.primaryColor;
        let logoImgUrl = req.body.logoImgUrl;
        let bgImgUrl = req.body.bgImgUrl;
        let calculatorId = calcId;
        let calcLinkId = req.body.calcLinkId;
        let calcEmail = req.body.calcEmail;
        let calcPhone = req.body.calcPhone;

        console.log("After collecting values");
        let siteData = new Sitedata({
            calculatorId,
            title_en,
            description_en,
            title_fr,
            description_fr,
            facebookUrl,
            twitterUrl,
            linkedin,
            secondaryColor,
            primaryColor,
            logoImgUrl,
            bgImgUrl,
            calcLinkId,
            calcEmail,
            calcPhone
        });

        await siteData.save();
        console.log("After Saving Theme data");
        calc.hasTheme = true;

        await calc.save();

        return res.status(200).send({message: "Site data created successfuly"});
    } catch (error) {
        return res.status(500).send({message: error})
    }
}


exports.getSiteData = async (req,res) => {
    try {
        let calcId = req.params.calculatorId;
        if(!calcId) {
            return res.status(400).send({message: "Calculator Id is required."})
        }
        let siteData = await Sitedata.findOne({calculatorId: calcId});
        if(siteData) {
            return res.status(200).send({message: "Site Info",data: siteData});
        }
       
        return res.status(404).send({Message: "Not Found"})
        
    } catch (error) {
        return res.status(500).send({message: error})
    }
}


exports.getSiteDataByShortUrl = async (req,res) => {
    try {
        let short_url = req.params.short_url;
        console.log(short_url)
        let calculatorInfo = await Sitedata.findOne({calcLinkId: short_url})
      
        return res.status(200).send({message: "Calculator Info", info: calculatorInfo});
    } catch (error) {
        return res.status(500).send({error: error})
    }
}


exports.updateSiteData = async (req,res) => {
    try {
        let themeId = req.params.themeId;
        let data = req.body;
        console.log("DATA BELOW")
        console.log(themeId)
        console.log(data)
        await Sitedata.update(
            {
                "_id": themeId
            },
            {
                $set: data
            }
        );

        return res.status(200).send({message: "Updated Successfuly"});
    } catch (error) {
        return res.status(500).send({message: error})
    }
}

exports.deleteInfo = async (req,res) => {
    try {
        console.log("REQUEST GOT HERE")
        let themeId = req.body.themeId;
        let fieldName = req.body.fieldName;
        let Theme = await Sitedata.findOne({_id: themeId});
        console.log("REQUEST GOT HERE")
        console.log(req.body)
        if(fieldName == "facebook") {
            Theme.facebookUrl = null;
        }else if(fieldName == "twitter") {
            Theme.twitterUrl = null;
        }else if(fieldName == "linkedin") {
            Theme.linkedin = null;
        }else if(fieldName == "phone") {
            Theme.calcPhone = null;
        }else if(fieldName == "email") {
            Theme.calcEmail = null;
        }

        await Theme.save();

        return res.status(200).send({message: "Deleted Sucessfuly"})
    } catch (error) {
        return res.status(500).send({message: error})
    }
}