const { client } = require('./database/database');
const nodemailer = require('nodemailer')
require('dotenv').config();

// Database access
const database = client.db("valcourtApp");
const users = database.collection("users");


// Send an email
const sendMail = (email, subject, message) => {
    const Transport = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.SENDER_EMAIL,        // put your gmail username here
        pass: process.env.SENDER_EMAIL_PASSWORD  // and your password here
      }
    });
  
    let sender = "Valcourt_App";
    const mailOptions = {
      from: sender,
      to: email,
      subject: subject,
      html: message
    };
  
    Transport.sendMail(mailOptions, function(error, response) {
      if (error) {
        console.log(error);
      } else {
        console.log("Message sent");
      }
    })
}
//TODO change english txt to French
// For account confirmation on registration
const sendConfirmationMail = (email, uniqueString) => {
  const subject = "Confirmation de l'émail"
  const message = `Cliquez <a href=http://localhost:3000/verify/${uniqueString}> ici</a> pour vérifier votre email. Thanks.`

  sendMail(email, subject, message);
}

// For forgotten passwords
const sendForgottenPasswordMail = (email, uniqueString) => {
  const subject = "Mot de passe oublié"
  const message = `Cliquez <a href=http://localhost:3000/reset/${uniqueString}> ici</a> pour réinitialiser votre mot de passe.`
  sendMail(email, subject, message)
}

// TODO:
const sendEventNotification = (email) => {
  const subject = ""
  const message = ""
  sendMail(email, subject, message);
}

module.exports = {sendMail, sendConfirmationMail, sendForgottenPasswordMail}