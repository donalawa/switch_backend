const Logs = require("../models/Logs");

module.exports = {
    saveLog:  async function(message,ownerId) {
        try {
            let Log = new Logs({message: message, ownerId: ownerId});
            await Log.save();
            return;
        } catch (error) {
            console.log("THERE WAS AN ERROR TRYING TO SAVE LOG")
            console.log(error);
        }
    }
} 