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


module.exports = router;
