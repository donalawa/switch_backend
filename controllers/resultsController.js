let Results = require('../models/Results');


exports.createResult = async (req,res) => {
    try {
        let name = req.body.name;
        let email = req.body.email;
        let phone = req.body.phone;
        let message = req.body.message;
        let calculatorId = req.body.calculatorId;
        let clientOptions = req.body.clientOptions;
        let clientPandT = req.body.clientPandT;

        let newResult = new Results({
            name,
            email,
            phone,
            message,
            calculatorId,
            clientOptions,
            clientPandT
        });

        await newResult.save();

        return res.status(200).send({message: "Client Result Saved"});
    } catch (error) {
        console.log(error);
        return res.status(500).send({message: "There was an error saving result"})
    }
}


exports.getResultsForCalc = (req,res) => {
    try {
        
    } catch (error) {
        
    }
}

