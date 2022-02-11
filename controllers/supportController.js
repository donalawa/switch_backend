const Support = require("../models/Support");

exports.newContact = async (req,res) => {
    let name = req.body.name;
    let email = req.body.email;
    let subject = req.body.subject;
    let description = req.body.description;
    let issue_category = req.body.issue_category;
    let imgUrl = req.body.imgUrl;
    let userEmail = req.userEmail;

    try {
        let contact = new Support({
            name,
            email,
            subject,
            description,
            issue_category,
            imgUrl,
            userEmail
        })

        await contact.save();

        return res.status(200).send({message: "Support submited"})
    } catch (error) {
        return res.status(500).send({message: error})
    }
}


exports.getAllContacts = async (req,res) => {
    // Write code to get all support tickets
    try {
        let tickets = await Support.find();

        return res.status(200).send({message: "All support tickets", data: tickets});

    } catch (error) {
        return res.status(500).send({message: error})
    }


}

exports.getUsersContacts = (req,res) => {
    // Wite code to get contacts for specific user
    try {
        let userEmail = req.email;

        let contacts = Support.find({ownerEmail: userEmail});
    
        return res.status(200).send({message: "User contacts", data: contacts});
        
    } catch (error) {
        return res.status(500).send({message: error})
    }
}