/**
* The file to start server and register all routes of the application {@link link
    name}
    * @author Donacien
    * @date 23/12/2021
    * Contributors : 
**/

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// IMPORTING UTILS
const initialRoles = require('./utils/intialRoles');

//IMPORTING THE ROUTES BELLOW
const adminRoutes = require("./routes/adminRoutes");
const answerRoutes = require("./routes/answersRoutes");
const questionRoutes = require("./routes/questionRoutes");
const siteDataRoutes = require("./routes/siteDataRoutes");
const userRoutes = require("./routes/userRoutes");
const verifyUserRoute = require("./routes/verifyUserRoute");
const changePasswordRouter = require("./routes/changePasswordRoute");
const calculatorRouter = require("./routes/calculatorRoutes");
const supportRouter = require("./routes/contactRoutes");
const improoveRouter = require("./routes/ImprooveRouter");
const logsRouter = require('./routes/logsRoutes');
const resultsRouter = require('./routes/resultsRouter');

// Imports for firebase
const admin = require('firebase-admin');
var serviceAccount = require("./what-says-firebase-adminsdk-npy50-18d3ae756b.json");

const app = express();

app.use(express.json());

// cors allow cors
app.use(cors())

//Install dotenv module
dotenv.config();


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


// Variable to hold port
var port = process.env.PORT || 8070;

// USE ALL ROUTES
app.use(adminRoutes);
app.use(answerRoutes);
app.use(questionRoutes);
app.use(siteDataRoutes);
app.use(userRoutes);
app.use(verifyUserRoute);
app.use(changePasswordRouter);
app.use(calculatorRouter);
app.use(supportRouter);
app.use(improoveRouter);
app.use(logsRouter);
app.use(resultsRouter);


app.use("/status",(req,res) => {
    res.send({status: "OK"});
})


mongoose.connect(process.env.DATABASE_URL, { useUnifiedTopology: true, useNewUrlParser: true,}, (err,res) => {
    if(err){
        console.log(err)
    }
    else{
      console.log('Connected to Database');
      initialRoles.initial();
    }
});

// by default, you need to set it to false.
mongoose.set('useFindAndModify', true);


app.listen(port, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`Project is running on port ${port}`)
    }
})
