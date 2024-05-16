const express = require("express");
const { client } = require("../database/database");
require('dotenv').config();
const { sendMultiMail } = require("../email");
const { adminAuth } = require("../Middlewares/auth.middleware");

const router = express.Router();

// Database access
const database = client.db("valcourtApp");
const users = database.collection("users");

// Health check
router.get("/", (req, res) => {
  res.status(200);
  res.send({
    message: "Auth router is working.",
  });
});

// Route for admin to send an email to all users subscribed to specific event.
router.post("/adminEventMail", adminAuth, async (req, res) => {

  const body = req.body;
  
  const userList = await users.find(
    { subbedEvents: { $elemMatch: { $eq: body.eventId } } },
    { projection :{ "email": 1, "_id": 0 }}
  ).toArray()

  // If no users are found, end the procedure.
  if(userList.length === 0) {

    res.status(404);
    res.send({
    message: "No users found.",
    });

    return
  }
  
  const emailList = userList.map((element) => {
    return element.email
  })

  // Send the email
  sendMultiMail(emailList, body.subject, body.message)

  res.status(200);
  res.send({
    message: "Multi-mail sent.",
  });
});


module.exports = router;
