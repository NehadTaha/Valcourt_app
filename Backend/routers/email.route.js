const express = require("express");
const { client } = require("../database/database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer")
require('dotenv').config();
const secret_key = require("../constants");
const { sendConfirmationMail, sendMail, sendForgottenPasswordMail, sendMultiMail } = require("../email");
const { route } = require("./auth.route");

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

router.get("/test", (req, res) => {

  const emailList = ["gasser.noahs@gmail.com", ""]

  sendMultiMail(emailList, "Test", "Boo.")

  res.status(200);
  res.send({
    message: "Multi-mail sent.",
  });
});


router.post("/adminEventMail", async (req, res) => {

  const body = req.body;
  
  const userList = await users.find(
    { subbedEvents: { $elemMatch: { $eq: body.eventId } } },
    { projection :{ "email": 1, "_id": 0 }}
  ).toArray()

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

  console.log('emailList: ', emailList);

  sendMultiMail(emailList, body.subject, body.message)

  res.status(200);
  res.send({
    message: "Multi-mail sent.",
  });
});


module.exports = router;
