const Role = require("../models/Role");

 exports.initial = () => {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'admin' to roles collection");
        });
  
        new Role({
          name: "super"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'super' to roles collection");
        });
  
        }
    })
}