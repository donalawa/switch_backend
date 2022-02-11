const moment = require('moment');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const config = require("../config/auth.config");
const nodemailer = require("../config/nodemailer.config");
const User = require("../models/User");
const Role = require("../models/Role")

// const answerDb = db.collection('answers');

// const { v4: uuidv4 } = require('uuid');

exports.signup = (req, res) => {
    const token = jwt.sign({ email: req.body.email }, config.secret);
  
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
            name: { $in: req.body.roles },
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
  
              res.send({
                message:
                  "User was registered successfully! Please check your email",
              });
              nodemailer.sendConfirmationEmail(
                user.username,
                user.email,
                user.confirmationCode
              );
              res.redirect("/");
            });
          }
        );
      } else {
        Role.findOne({ name: "user" }, (err, role) => {
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
  
  exports.signin = (req, res) => {
    User.findOne({
      username: req.body.username,
    })
      .populate("roles", "-__v")
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
  
        var token = jwt.sign({ id: user.id }, config.secret, {
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
          accessToken: token,
          status: user.status,
        });
      });
  };
  




// exports.addAnswerForQUestionFb = async(req, res) => {
//     try {
//         let userId = req.body.user_id;
//         let id = uuidv4();
//         let questionId = req.body.question_id;
//         let date = moment().format();
//         let data = { _id: id, user_id: userId, question_id: questionId, answer_text: req.body.answer_text, Created_At: date }
//         let answer = await answerDb.doc(questionId).get();
//         let allAnswers = [];
//         if (!answer.exists) {
//             await answerDb.doc(questionId).set({ answers: [data] });

//         } else {
//             let answer = await answerDb.doc(questionId).get();
//             allAnswers = answer.data().answers;
//             allAnswers.push(data);
//             await answerDb.doc(questionId).update({ answers: allAnswers })
//             console.log(allAnswers)
//         }
//         return res.status(201).send({ success: true, message: "Answer Added Successfuly" })
//     } catch (error) {
//         // console.log(error)
//         res.status(500).send({ success: false, message: "There was an error with the request" })
//     }
// }