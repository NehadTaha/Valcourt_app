const express = require("express");
const { client } = require("../database/database");
const { ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const secret_key = require("../constants");
const removeItemOnce = require("../utils")

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

//remove a topic from user
router.post("/topics/remove/:userId/:topic" ,async (req,res)=>{
  try{
    
    const id = new ObjectId(req.params.userId)
    const user = await users.findOne({_id:id})
    const topicArray = user.topics
    const updatedArray = removeItemOnce(topicArray,req.params.topic)

    const result =  await users.updateOne({_id:id},{$set:{topics:updatedArray}})

    res.status(200)
    res.send({message: updatedArray})

  }catch(e){
    console.log(e)
    res.status(500)
    res.send({message: e}) 
  }
 
})

//add a topic to user
router.post("/topics/add/:userId/:topic" ,async (req,res)=>{
  try{
    
    const id = new ObjectId(req.params.userId)
    const user = await users.findOne({_id:id})
    const topicArray = user.topics
    topicArray.push(req.params.topic.toString())
    console.log(topicArray)
    const updatedArray = topicArray
    console.log(req.params.topic)
    console.log(updatedArray)

    const result =  await users.updateOne({_id:id},{$set:{topics:updatedArray}})

    res.status(200)
    res.send({message: updatedArray})

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
    }

    
  } catch (error) {
    // Handle any errors (e.g., invalid token, database error)
    console.error("Error fetching user info:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
