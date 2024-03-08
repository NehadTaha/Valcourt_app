const express = require("express");
const { client } = require("../database/database");
const { ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const secret_key = require("../constants");

const router = express.Router();

// Database access
const database = client.db("valcourtApp");
const users = database.collection("users");

router.get("/", (req, res) => {
  res.status(200);
  res.send({
    message: "Auth router is working.",
  });
});

// Profile route
router.get("/profile", async (req, res) => {
  try {
    // Extract the token from the request headers
    const token = req.headers.authorization.split(" ")[1];
    console.log("token: ", token);

    // Verify the token
    const decodedToken = jwt.verify(token, secret_key);
    console.log("decodedToken: ", decodedToken);
    console.log("decodedToken.userId: ", decodedToken.userId);

    // Retrieve the user's information from the database using the user ID stored in the token
    const userId = new ObjectId(decodedToken.userId); // Use 'new' keyword here
    const user = await users.findOne({ _id: userId });
    console.log("user: ", user);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If the user exists, send the user's information as a response
    res.status(200).json(user);
  } catch (error) {
    // Handle any errors (e.g., invalid token, database error)
    console.error("Error fetching user info:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
