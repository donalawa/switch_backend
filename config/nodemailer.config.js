const nodemailer = require("nodemailer");
const config = require("./auth.config");

const user = config.user;
const pass = config.pass;

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});


module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
    console.log("Check");
    transport.sendMail({
      from: user,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p>Thank you for creating an account on our plartform. Please confirm your email by clicking on the following link</p>
          <a href=http://localhost:8070/auth/verify/${confirmationCode}> Click here</a>
          </div>`,
    }).catch(err => console.log(err));
};


module.exports.sendForgotPasswordEmail = (name, email, resetCode) => {
  transport.sendMail({
    from: user,
    to: email,
    subject: "Reset Password",
    html: `<h1>Follow the message below to reset password</h1>
        <h2>Hello ${name}</h2>
        <p>Please click the button bellow to reset your password</p>
        <a href=http://localhost:8081/new-password/${resetCode}> Click here</a>
        </div>`,
  }).catch(err => console.log(err));
};