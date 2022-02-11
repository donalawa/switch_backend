const Improove = require("../models/Improve");


exports.newSuggestion = async (req,res) => {
    // CODE HERE
    try {
        let suggestion = new Improove(req.body);

        await suggestion.save();

        return res.status(201).send({message: "Suggestion Created"})
    } catch (error) {
        return res.status(500).send({message: error})
    }
}


exports.allSuggestions = async (req,res) => {
    // CODE HERE
    try {
        let suggestions = await Improove.find();

        return res.status(200).send({message: "All Suggestions", data: suggestions});
    } catch (error) {
        return res.status(500).send({message: error})
    }
}