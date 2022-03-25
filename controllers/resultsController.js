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
        let calcOwnerId = req.body.calcOwnerId;

        let newResult = new Results({
            name,
            email,
            phone,
            message,
            calculatorId,
            clientOptions,
            clientPandT,
            calcOwnerId
        });

        await newResult.save();
        return res.status(200).send({message: "Client Result Saved"});
    } catch (error) {
        console.log(error);
        return res.status(500).send({message: "There was an error saving result"})
    }
}


exports.getResultsForCalc = async (req,res) => {
    try {
        let calcId = req.params.calcId;
        let allResults = await Results.find({calculatorId: calcId}).populate("clientOptions.options");

        return res.status(200).send({message: "All Results For Caculator", data: allResults})
    } catch (error) {
        return res.status(500).send({message: "There was an error", error: error});
    }
}


exports.getAllResults = async(req,res) => {
    try {
        let ownerId = req.userId;

        let allResults = await Results.find({calcOwnerId: ownerId}).populate("clientOptions.questionId").populate("clientOptions.options");

        return res.status(200).send({message: "All Results", data: allResults})

    } catch (error) {
        return res.status(500).send({message: "There was an error", error: error})
    }
}

exports.getResultById = async(req,res) => {
    try {
        let resultId = req.params.id;

        let resultData = await Results.findOne({_id: resultId}).populate("clientOptions.questionId").populate("clientOptions.options");

        return res.status(200).send({message: "Result", data: resultData})

    } catch (error) {
        return res.status(500).send({message: "There was an error", error: error})
    }
}



exports.deleteResult = async (req,res) => {
    try {
        let resultId = req.params.resultId;

        await Results.remove({_id: resultId});

        return res.status(200).send({message: "Result Deleted"});
    } catch (error) {
        
    }
}