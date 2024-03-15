const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const router = express.Router();
router.use(bodyParser.json());

router.post("/webhook", (req, res) => {
  console.log("Received webhook payload:", req.body);
  // Handle the incoming webhook payload here
  const post = req.body; // Assuming the payload contains post data
  console.log("Received webhook payload:", post);

  // You can perform any actions with the post data here

  res.status(200).send(post);
});

module.exports = router;
