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

// Send an email to multiple recipients
const sendMultiMail = (emails, subject, message) => {
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
    cc: emails,
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

// Function to conduct the notification using a list of topics
const eventTopicNotification = async (topics, eventTitle, eventUrl) => {
  const userList = await users.find(
    { topics: { $in: topics } },
    { projection :{ "email": 1, "_id": 0 }}
  ).toArray()

  const emailList = userList.map((element) => {
    return element.email
  })

  sendEventTopicNotification(emailList, eventTitle, eventUrl)
}



// TODO:
const sendEventTopicNotification = (emails, eventTitle, eventUrl) => {
  const subject = "Nouvel évènement: "+ eventTitle
  const message = `<p>Un nouvel évènment à Valcourt2030!</p><br><a href='`+eventUrl+`'>Cliquez ici pour y accéder!</a>`
  sendMultiMail(emails, subject, message);
}

module.exports = {sendMail, sendMultiMail, sendConfirmationMail, sendForgottenPasswordMail, eventTopicNotification}