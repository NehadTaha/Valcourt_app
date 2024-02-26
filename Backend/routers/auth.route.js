const express = require("express");
const { client } = require("../database/database");
const jwt = require("jsonwebtoken");
const secret_key = "utwet72re71f782te";

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

// Login route
router.post("/login", async (req, res) => {
  const body = req.body;
  console.log("body: ", body);

  const defPass = "1234";
  const defMail = "his@mail.com";

  if (!body.email || !body.password) {
    res.status(401).send({
      message: "Missing credentials. Access denied.",
    });

    return;
  }

  const user = await users.findOne({ email: body.email });

  if (!user || body.email !== user.email || body.password !== user.password) {
    res.status(401).send({
      message: "Invalid email or password.",
    });

    return;
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

  // Add user to DB
  try {
    const result = await users.insertOne({
      email: body.email,
      password: body.password,

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

module.exports = router;
