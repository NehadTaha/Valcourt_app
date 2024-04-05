const express = require("express");
const { client } = require("../database/database");
const { ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const secret_key = require("../constants");
const removeItemOnce = require("../utils");
const { json } = require("body-parser");

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


//update topic list 
router.post("/topics/update/:userId/" ,async (req,res)=>{
  try{
    
    const id = new ObjectId(req.params.userId)

    const list = req.body.topicList

    const result =  await users.updateOne({_id:id},{$set:{topics:list}})

    res.status(200)
    res.send({message: result})

  }catch(e){
    console.log(e)
    res.status(500)
    res.send({message: e}) 
  }
 
})



// Profile route
router.get("/profile", async (req, res) => {
  try {
    // Extract the token from the request headers
    const token = req.headers.authorization.split(" ")[1];
    console.log("token: ", token);

    if(token == undefined){
      return res.status(404).json({message:"Token not found"})
    }else{
      // Verify the token
      const decodedToken = jwt.verify(token, secret_key);
      //console.log("decodedToken: ", decodedToken);
      //console.log("decodedToken.userId: ", decodedToken.userId);

      // Retrieve the user's information from the database using the user ID stored in the token
      const userId = new ObjectId(decodedToken.userId); // Use 'new' keyword here
      const user = await users.findOne({ _id: userId });
      //console.log("user: ", user);

      // Check if the user exists
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // If the user exists, send the user's information as a response
      res.status(200).json(user);
    }

    
  } catch (error) {
    // Handle any errors (e.g., invalid token, database error)
    //console.error("Error fetching user info:", error);
    res.status(500).json({ message: "Internal server error" });
  }
  // Profile route to update user profile
  router.put("/profile", async (req, res) => {
    try {
      // Extract the token from the request headers
      const token = req.headers.authorization.split(" ")[1];
      //console.log("token: ", token);

      // Verify the token
      const decodedToken = jwt.verify(token, secret_key);
      //console.log("decodedToken: ", decodedToken);
      //console.log("decodedToken.userId: ", decodedToken.userId);

      // Extract updated user data from the request body
      const updatedUserData = req.body;
      //console.log("updatedUserData: ", updatedUserData);

      // Update the user's information in the database using the user ID stored in the token
      const userId = new ObjectId(decodedToken.userId); // Use 'new' keyword here
      const result = await users.updateOne(
        { _id: userId },
        { $set: updatedUserData }
      );
      //console.log("result: ", result);

      // Check if the user exists
      if (result.modifiedCount === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      // If the user is updated successfully, send a success response
      res.status(200).json({ message: "User profile updated successfully" });
    } catch (error) {
      // Handle any errors (e.g., invalid token, database error)
      console.error("Error updating user info:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
});

router.post('/Subscribe', async (req,res) =>{
  try{
    const eventId = req.body.eventId
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, secret_key);
    const userId = new ObjectId(decodedToken.userId)

    const user = users.findOneAndUpdate(
      { _id: userId, "subbedEvents.eventId": { $ne: eventId } }, // Check if the user has the event already
      { $addToSet: { subbedEvents: { eventId: eventId } } }, // Add event to subbedEvents list if it doesn't exist
      { new: true } // Return the updated document
    );
    
    if (!user) {
      // If user is not found or event already exists in subbedEvents list
      res.status(404).json({message:"User not found or event already exists in subbedEvents list"})
    } else {
      res.status(200).json({message:"Event added to subbedEvents list for the user:", user})
    }
  }catch(e){
    console.log(e)
  }
})
router.get('/subbedEvent',async (req,res)=>{
  try{
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, secret_key);
    const userId = new ObjectId(decodedToken.userId)
    const result = await users.findOne({_id:userId})
    
    const eventList = result.subbedEvents
    console.log(eventList)

    res.status(200).json(eventList)
  }catch(e){
    console.log(e)
    res.status(500).json(e)
  }
})

module.exports = router;
