
const config = require("../config/auth.config");
const nodemailer = require("../config/nodemailer.config");
const User = require("../models/User");
const Role = require("../models/Role")

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

/**
 * CREATE USER
 * For creating a new admin or registering a new admin
 * @param {string} username this is the name of the admin
 * @param {string} email this is the email of the admin
 * @param {password} this is the admin's password
 * @return {Object} this will return an object after registration containing the success message
 **/    
exports.signup = (req, res) => {
    const token = jwt.sign({ email: req.body.email }, config.secret);
    console.log("User Registration");
    
    const user = new User({
      username: req.body.username,
      email: req.body.email,  
      password: bcrypt.hashSync(req.body.password, 8),
      confirmationCode: token,
    });
  
    user.save((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      if (req.body.roles) {
       
        Role.find(
          {
            _id: { $in: req.body.roles },
          },
          (err, roles) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
        
            user.roles = roles.map((role) => role._id);
            user.save((err) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
              
              res.status(201).send({
                message:
                  "User was registered successfully! Please check your email",
              });
              nodemailer.sendConfirmationEmail(
                user.username,
                user.email,
                user.confirmationCode
              );
             
            });
          }
        );
      } else {
        // If no role was selected then we want to make the user a super admin by default
        Role.findOne({ name: "super" }, (err, role) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
  
          user.roles = [role._id];
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({
              message:
                "User was registered successfully! Please check your email",
            });
            // Call the sendConfirmationEmail Config method to send confirmation email
            nodemailer.sendConfirmationEmail(
              user.username,
              user.email,
              user.confirmationCode
            );
          });
        });
      }
    });
  };
  
/**
 * LOGIN USER
 * When the admin ones to login
  * @param {string} email this is the name of the admin
  * @param {string} password this is the admin's password
  * 
  * @return {Object} this will return an object after login containing the user information and token
**/
  exports.signin = (req, res) => {
    console.log("#####login request#########");

    User.findOne({
      email: req.body.email,
    }).populate("roles", "-__v")
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
  
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
  
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!",
          });
        }
  
        if (user.status != "Active") {
          return res.status(401).send({
            message: "Pending Account. Please Verify Your Email!",
          });
        }
       
        var token = jwt.sign({ id: user._id, email: user.email }, config.secret, {
          expiresIn: 86400, // 24 hours
        });
        
     
        var authorities = [];
  
        for (let i = 0; i < user.roles.length; i++) {
          authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user._id,
          username: user.username,
          email: user.email,
          roles: authorities,
          imageUrl: user.imageUrl,
          accessToken: token,
          status: user.status,
        });
      });
  };
  


  exports.updateUsrs = async (req,res) => {
    console.log("REQUEST GOT HERE")
    try {
      let userId = req.userId;

      let user = await User.findOne({_id: userId});
     
      if(!user) {
        return res.status(404).send({message: "User not found"});
      }

      let imgUrl = req.body.imageUrl;

      user.imageUrl = imgUrl;

      await user.save();

      return res.status(200).send({message: "User profile pic added", user: user});
    } catch (error) {
      return res.status(500).send({error: error});
    }
  }