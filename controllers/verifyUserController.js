const User = require("../models/User");

exports.verifyUser = (req, res, next) => {
    User.findOne({
      confirmationCode: req.params.confirmationCode,
    }).then((user) => {
        console.log(user);
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
        user.status = "Active";
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.status(200).send({message: "Account Verified Successfuly"});
        });
      })
      .catch((e) => console.log("error", e));
  };