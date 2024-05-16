const express = require("express");
const { client } = require("../database/database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require('dotenv').config();
const { sendConfirmationMail, sendForgottenPasswordMail } = require("../email");

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


// Generates a random string
const generateRandString = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789{}/*<>?!@$%&()-+';
  const len = 8
  let randStr = ''
  for (let i = 0; i < len; i++) {
    // Appends a random character from the characters into randStr
    randStr += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return randStr
}


// Login route
router.post("/login", async (req, res) => {
  const body = req.body;
  console.log("body: ", body);

  if (!body.email || !body.password) {
    res.status(401).send({
      message: "Missing credentials. Access denied.",
    });

    return;
  }

  const user = await users.findOne({ email: body.email });
  
  if (!user) {
    res.status(401).send({
      message: 'Invalid email or password.',
    });
    
    return;
  }
  
  const verify = await bcrypt.compare(body.password, user.password);
  
  if (!verify) {
    res.status(401).send({
        message: 'Invalid email or password.'
    });

    return
  }

  if(!user.isValid) {
    res.status(401).send({
      message: 'Unverified.'
    });

    return
  }

  // Determine if the user is Admin or not
  let admin;

  if(user.admin) {
    admin = true;
  } else {
    admin = false
  }

  // Generate token
  const token = jwt.sign({ userId: user._id, admin: admin }, process.env.SECRET, {
    expiresIn: "1h",
  });

  res.status(200).send({
    message: 'Success',
    token: token,
  });
});


// User registration route
router.post("/register", async (req, res) => {
  const body = req.body;

  if (!body.email || !body.password) {
    res.status(401).send({
      message: "Missing credentials. Registration failed.",
    });

    return;
  }

  // Check if the email is already in the DB
  const email = await users.findOne({
    email: body.email,
  });

  if (email) {
    res.status(409).send({
      message: "Email already in use.",
    });

    return;
  }

  const uniqueString = generateRandString()

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(body.password, salt)

  try {

    // Send email confirmation
    sendConfirmationMail(body.email, uniqueString)

    // Add user to DB
    const result = await users.insertOne({
      email: body.email,
      password: passwordHash,
      uniqueString: uniqueString,
      isValid: false,

      firstName: body.firstName,
      lastName: body.lastName,
      town: body.town,
      topics: body.topics,
      subbedEvents:[]
    });

    console.log("result: ", result);
  } catch (error) {
    res.status(500).send({
      error,
    });

    console.log(error);

    return;
  }

  res.status(201).send({
    message: "User registered.",
  });
});

// Verify route
router.get('/verify/:uniqueString', async (req, res) => {
  // getting the string
  const { uniqueString } = req.params
  // checks if there is anyone with this string
  const user = await users.findOne({ uniqueString: uniqueString })
  if (user) {
    // if there is anyone, mark them verified
    await users.updateOne(
      {email: user.email}, 
      { $set: {"isValid": true} })
    res.json('Verified.')
  } else {
    // else send an error
    res.status(404)
    res.json('Not found')
  }
})

// Reset password (when forgotten) route
router.post('/reset', async (req, res) => {
  
  const email = req.body.email;
  
  const user = await users.findOne({ email: email })
  if (user) {
    // if the user exists...

    // Generate a short token
    const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
      expiresIn: "10m",
    }); 

    // Send the email
    sendForgottenPasswordMail(user.email, token);
    res.json('Email sent. Please check your inbox.')
  } else {
    // else send an error
    res.status(404)
    res.json('Not found')
  }

})

module.exports = router;
