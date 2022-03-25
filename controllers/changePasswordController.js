const User = require("../models/User");
var bcrypt = require("bcryptjs");
var crypto = require("crypto");
const nodemailer = require("../config/nodemailer.config");

exports.changePassword = (req,res) => {
    // Write Code Here
    console.log(req)
    User.findOne({
        // Get Email From Param
        email: req.email,
      })
        .populate("roles", "-__v")
        .exec((err, user) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          console.log("User Bellow")
          console.log(user);

        //   Veriry Old Password
          var passwordIsValid = bcrypt.compareSync(
            req.body.oldPassword,
            user.password
          );
    
          if (!passwordIsValid) {
            return res.status(400).send({
              accessToken: null,
              message: "Old Password Is Incorrect",
            });
          }
    
          
        //  SET NEW USER PASSSWORD
          let newPassword = bcrypt.hashSync(req.body.newPassword, 8)

          user.password = newPassword;
          user.save();

          res.status(200).send({
            message: "New Password Set Successfuly"
          });
        });
}

exports.resetPassword = async (req,res) =>{

  try {
    const user = await User.findOne({email: req.body.email});
    console.log(user)
    console.log("NODE MAILER SEND MAIL")

    let resetToken = crypto.randomBytes(20).toString('hex');
    let expireDate = Date.now() + 3600000;
    console.log("Generated Token Below");

    console.log(resetToken);

    user.resetPasswordToken = resetToken;
    user. resetPasswordExpire = expireDate;


    nodemailer.sendForgotPasswordEmail(user.username, user.email, resetToken);

    await user.save();

    if(!user) {
      return res.status(404).send({message: "User Email Not Found"});
    }

    return res.status(200).send({message: "Password Reset Email Sent"})

  } catch (error) {
    return res.status(500).send({message: "There was an error"})
  }
}

exports.resetNewPassword = async (req,res) => {
  try {
    let token = req.body.resetToken;

    let user = await User.findOne({resetPasswordToken: token});
    let newPassword = req.body.password;
    let confirmNewPassword = req.body.newPasswordConfirm;

    if(newPassword != confirmNewPassword) {
      return res.status(500).send({message: "Passwords do not match"});
    }

    user.password = bcrypt.hashSync(newPassword, 8);
    user.confirmationCode = null;
    user.resetPasswordExpire = null;
    console.log("USER BELOW IS USER BEFORE SAVE");

    console.log(user);
    await user.save();

    return res.status(200).send({message: "Passord Reset Successfuly"});

  } catch (error) {
    console.log(error);
    return res.status(500).send({message: "There was an error reseting password"})
  }
}
