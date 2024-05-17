const { client } = require('./database/database');
const nodemailer = require('nodemailer')
require('dotenv').config();

// Database access
const database = client.db("valcourtApp");
const users = database.collection("users");
const events = database.collection("events")


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
  const message = `Cliquez <a href=http://localhost:3000/verify/${uniqueString}> ici</a> pour vérifier votre email. Merci.`

  sendMail(email, subject, message);
}

// For forgotten passwords
const sendForgottenPasswordMail = (email, uniqueString) => {
  const subject = "Mot de passe oublié"
  const message = `Cliquez <a href=http://localhost:3000/reset/${uniqueString}> ici</a> pour réinitialiser votre mot de passe.`
  sendMail(email, subject, message)
}

// Function to notify users with relevant topics of a new event
const sendEventTopicNotification = async (eventId) => {

  try {
    // Gets the event data according to its eventId
    const event = await events.findOne(
      { eventId: eventId }
    )

    // If the updatedCount is greater than 1, cancel the notification
    // So notifications are not sent at every update
    if(event.updatedCount > 1) {
      console.log('Notification aborted');
      return
    }
    
    // Extract the eventTag array from the event object
    const evenTag = Object.values(await event.eventTag)
    
    // Extract the topics from the objects in the eventTag array 
    const topics = evenTag.map((tag) => {
      return tag.name
    })
    
    // Gets the list of users subscribed to the relevant topics
    const userList = await users.find(
      { topics: { $in: topics } },
      { projection :{ "email": 1, "_id": 0 }}
    ).toArray()
  
    // Extracts the emails from the list of users
    const emailList = userList.map((element) => {
      return element.email
    })

    // Email Details and Sending - CONSULT THIS TO EDIT
    const subject = "Nouvel évènement: "+ event.eventTitle
    const message = `<p>Un nouvel évènment à Valcourt2030!</p><br> Consultez le <a href='https://valcourt2030.org/calendrier/'>site web<a/> ou <a href='`+event.eventUrl+`'>cliquez ici pour accéder au formulaire!</a>`
    sendMultiMail(emailList, subject, message);

  } catch (error) {
    console.log(error);
  }
  
}

module.exports = {sendMail, sendMultiMail, sendConfirmationMail, sendForgottenPasswordMail, sendEventTopicNotification}