const nodemailer = require("nodemailer");

const { EMAIL, PASSWORD } = process.env;

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: `${EMAIL}`,
    pass: `${PASSWORD}`
  }
});

function sendEmail(req, res) {
  let mailOptions = {
    from: `${EMAIL}`,
    to: req.body.email,
    subject: "Welcome, and thanks for using TherApy!",
    text: "We Hope you enjoyed your experience using our app!",
    html: "<b>We Hope you enjoyed your experience using our app!</b>"
  };

  transporter.sendMail(mailOptions, function(error, data) {
    if (error) {
      console.log("error occured", error);
    } else {
      console.log("successfully sent!");
    }
  });
}

module.exports = {
  sendEmail
};
