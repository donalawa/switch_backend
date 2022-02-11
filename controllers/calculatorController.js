const Calculator = require("../models/Calculator");
const SiteData = require('../models/Sitedata');
const saveLog = require('../utils/saveLog').saveLog;



/**
 * CREATE CALCULATOR
 * For ceating a new project cost calculator
 * @param {string} name this is the name of the calculator
 * @param {string} description of the calculator use
 * @param {string} notificationEmail this is the email where a notificationwill be sent to each time someone submits new answers from this calculator
 * @param {string} ownerId this is the admin's id
 * @return {Object} this will return an object after registration containing the success message
 **/
exports.createCalculator = (req,res) => {
    // CODE HERE
    try {
        let name = req.body.name;
        let description = req.body.description;
        let notificationEmail = req.body.notificationEmail;
        let ownerId = req.userId;
        
        let calculator = new Calculator({
            name,
            description,
            notificationEmail,
            ownerId,
            hasTheme: true
        })
        
        let linkId = name.toLowerCase().split(" ").join("_");

        calculator.save(async (err,calculator) => {
            if(err) {
                res.status(500).send({message: err});
                return;
            }
            // Create A New Log For New Calculator
            saveLog(`Created A New Calculator With Name ${name}`, ownerId);
            let siteData = new SiteData({calculatorId: calculator._id, calcLinkId: linkId});

            await siteData.save();

            return res.status(200).send({message: "Calculator Created Successfuly"});
        })
    } catch (error) {
        return res.status(500).send({messaage: error})
    }
}


/**
 * EDIT CALCULATOR
 * This controller method is for editing the calculator
 * @param {string} name this is the name of the calculator
 * @param {string} description of the calculator use
 * @param {string} notificationEmail this is the email where a notificationwill be sent to each time someone submits new answers from this calculator
 * @param {string} ownerId this is the admin's id
 * @param {string} calculatorId is the id of the calculator you want to edit
 * @return {Object} this will return an object after registration containing the success message
 **/
exports.updateCalculator = async (req,res) => {
    // CODE FOR EDITING HERE
    try {
        console.log("GOT TO UPDATE CONTROLLER")
        let id = req.params.calculatorId;
        let name = req.body.name;
        let description = req.body.description;
        let notificationEmail = req.body.notificationEmail;
        let ownerId = req.userId;

       
       await Calculator.update(
            {
                "_id": id
            },
            {
                $set: {name,description,notificationEmail}
            }
        );

        saveLog(`Updated Calculator With Name ${name}`, ownerId);

        return res.status(200).send({message: "Updated Successfuly"});

    } catch (error) {
        return res.status(500).send({message: error})
    }
}


/**
 * GET ALL CALCULATORS
 * This controller method is for getting all available calculators
 * @return {Object} this will return an array of objects container all the calculators
 **/
 exports.getAllCalculators = async (req,res) => {
     console.log("GETING CALCULATOR")
    try {
        let calculators = await Calculator.find({ownerId: req.userId});

        return res.status(200).send({message: "All Calculators", calculators})
    } catch (error) {
        return res.status(500).send({message: error})
    }
}


/**
 * GET ALL CALCULATORS WITH THEME
 * This controller method is for getting all available calculators that already have a theme
 * @return {Object} this will return an array of objects container all the calculators with theme
 **/

exports.getCalculatorsWithTheme = async (req,res) => {
    console.log("GETING CALCULATOR")
    try {
        let ownerId = req.userId;

        let calculators = await Calculator.find({ownerId: ownerId, hasTheme: true});
    
        return res.status(200).send({message: "Calculators With Theme", calculators: calculators});
    } catch (error) {
        return res.status(500).send({message: error})
    }
}

/**
 * GET CALCULATOR BY ID
 * This controller method get a calculator by it's id
 * @param {string} calculatorId This is the id of the calculator you want to get
 * @return {Object} this will return an object of the calculator
 **/
 exports.getCalculatorById = async(req,res) => {
    console.log("GETING CALCULATOR")
    try {
        let calcId = req.params.calculatorId;
        let calculator = await Calculator.findOne({_id: calcId});

        return res.status(200).send({message: "Calculator", calculator: calculator})
    } catch (error) {
        return res.status(500).send({message: error})
    }
}

// CLIENT GET CALCULATOR
exports.getCalculatorByIdClient = async(req,res) => {
    console.log("GETING CALCULATOR FOR CLIENT")
    try {
        let calcId = req.params.calculatorId;
        let calculator = await Calculator.findOne({_id: calcId});

        return res.status(200).send({message: "Calculator", calculator: calculator})
    } catch (error) {
        return res.status(500).send({message: error})
    }
}



/**
 * DELETE CALCULATOR
 * This controller method is deleting a calculator by its id
 * @param {string} calculatorId This is the id of the calculator you want to get
 * @return {Object} this will return an array of objects container all the calculators
 **/
 exports.deleteCalculator = async(req,res) => {
    
    try {
        let calcId = req.params.calculatorId;
        let calculator = await Calculator.findOne({_id: calcId});
        let name = calculator.name;
        let ownerId = req.userId;

        await Calculator.remove({_id: calcId});
        saveLog(`Deleted Calculator With Name ${name}`, ownerId);
        return res.status(200).send({message: "Calculator Deleted"})
    } catch (error) {
        return res.status(500).send({message: error})
    }
}
