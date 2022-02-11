const Logs = require('../models/Logs');

exports.getAllLogs = async (req,res) => {
    try {
        let ownerId = req.userId;

        let logs = await Logs.find({ownerId: ownerId});

        return res.status(200).send({message: "All Logs", logs: logs})
    } catch (error) {
        return res.status(500).send({message: "There was an error trying to get logs"})
    }
}