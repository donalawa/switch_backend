var bcrypt = require("bcryptjs");
var User = require("../models/User");
const nodemailer = require("../config/nodemailer.config");


exports.resetUserPassword = (req,res) => {
    // Get user email
    let email = req.body.email;

    let code = Math.random() * 6;
    // Create reset password link and send to email

    // Send response of check your email
}