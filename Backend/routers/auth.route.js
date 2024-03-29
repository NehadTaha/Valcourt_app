const express = require("express");
const { client } = require("../database/database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer")
require('dotenv').config();
const secret_key = require("../constants");
console.log('secret_key: ', secret_key);

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


// Generates a random string (copied function)
const randString = () => {
  // a 8 length
  const len = 8
  let randStr = ''
  for (let i=0; i<len; i++) {
    //ch = a number between 1 to 10
    const ch = Math.floor((Math.random() * 10) + 1)
    randStr += ch
  }

  return randStr
}

const sendMail = (email, uniqueString) => {
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
    subject: "Email confirmation",
    html: `Press <a href=http://localhost:3000/verify/${uniqueString}> here</a> to verify your email. Thanks.`
  };

  Transport.sendMail(mailOptions, function(error, response) {
    if (error) {
      console.log(error);
    } else {
      console.log("Message sent");
    }
  })

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


  // Generate token
  const token = jwt.sign({ userId: user._id }, secret_key, {
    expiresIn: "1h",
  });

  res.status(200).send({
    message: "Success",
    token: token,
  });
});


// User registration route
router.post("/register", async (req, res) => {
  const body = req.body;
  console.log("body: ", body);

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

  const uniqueString = randString()

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(body.password, salt)


  try {

    // Send email confirmation
    sendMail(body.email, uniqueString)

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

module.exports = router;
