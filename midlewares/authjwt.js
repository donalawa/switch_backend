const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const User = require("../models/User");
const Role = require("../models/Role");

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
  
    req.userId = decoded.id;
    // console.log("REQUEST IN AUTH")
    // console.log(decoded.id)
    // SETTING EMAIL TO THE REQUEST
    req.email = decoded.email;
    next();
  });
};

isAdmin = (req, res, next) => {
  try {
    User.findById(req.userId).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if(user == null) {

        return res.status(404).send({message: "User not found"});
      }

      Role.find(
        {
          _id: { $in: user.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
  
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "admin") {
              next();
              return;
            }
          }
  
          res.status(403).send({ message: "Require Admin Role!" });
          return;
        }
      );
    });

    
  } catch (error) {
    return res.status(500).send({message: "There was an error"});
  }
};

isSuperAdmin = (req, res, next) => {
  try {
    User.findById(req.userId).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if(user == null) {
        return res.status(404).send({message: "User not found"});
      }
      Role.find(
        {
          _id: { $in: user.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
  
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "super") {
              next();
              return;
            }
          }
  
          res.status(403).send({ message: "Require Super Admin Role!" });
          return;
        }
      );
    });
  } catch (error) {
    return res.status(500).send({message: "There was an error"});
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
  isSuperAdmin
};

module.exports = authJwt;