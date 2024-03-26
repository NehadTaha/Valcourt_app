const express = require("express");
const bodyParser = require("body-parser");
const { client } = require("../database/database");
const { ObjectId } = require("mongodb");

const database = client.db("valcourtApp");
const events = database.collection("events");
const venues = database.collection("venues");
const eventData = database.collection("combinedData");

const router = express.Router();
router.use(bodyParser.json());

// Webhook endpoint to receive payloads from WordPress and save them to the database
router.post("/webhook", async (req, res) => {
  try {
    // console.log("Received webhook payload:", req.body);

    // Extract the desired data from the payload
    const { post, post_meta, taxonomies } = req.body;
    const {
      ID: eventId,
      post_title: eventTitle,
      post_content: eventContent,
    } = post;

    // Extract start date and end date from post_meta
    const {
      _EventStartDate: eventStartDate,
      _EventEndDate: eventEndDate,
      _EventVenueID: eventVenueId,
    } = post_meta;
    const { tribe_events_cat: tribeEventsCat } = taxonomies;
    const categories = tribeEventsCat || {};

    // Update or insert the post data to the events collection
    await events.updateOne(
      { eventId: eventId },
      {
        $set: {
          eventTitle,
          eventContent,
          eventStartDate: eventStartDate ? eventStartDate[0] : null,
          eventEndDate: eventEndDate ? eventEndDate[0] : null,
          eventVenueId: eventVenueId ? eventVenueId[0] : null,
          categories,
        },
      },
      { upsert: true }
    );

    // console.log("Post data saved to the database.");
    res.status(200).send("Post data saved to the database.");
  } catch (error) {
    console.error("Error saving post data to the database:", error);
    res.status(500).send("Error saving post data to the database");
  }
});

// Webhook endpoint to receive payloads for venues and save them to the database
router.post("/webhook/venues", async (req, res) => {
  try {
    // console.log("Received webhook payload for venues:", req.body);

    const { post, post_meta } = req.body;
    const { ID: venueId, post_title: venueTitle } = post;
    const {
      _VenueAddress: eventVenueAddress,
      _VenueCity: eventVenueCity,
      _VenueCountry: eventVenueCountry,
      _VenueState: eventVenueState,
      _VenueZip: eventVenueZip,
      _VenuePhone: eventVenuePhone,
      _VenueURL: eventVenueURL,
      _VenueStateProvince: eventVenueStateProvince,
    } = post_meta;

    // Update or insert the venue data to the venues collection
    await venues.updateOne(
      { venueId: venueId },
      {
        $set: {
          venueTitle,
          eventVenueAddress: eventVenueAddress ? eventVenueAddress[0] : null,
          eventVenueCity: eventVenueCity ? eventVenueCity[0] : null,
          eventVenueCountry: eventVenueCountry ? eventVenueCountry[0] : null,
          eventVenueState: eventVenueState ? eventVenueState[0] : null,
          eventVenueZip: eventVenueZip ? eventVenueZip[0] : null,
          eventVenuePhone: eventVenuePhone ? eventVenuePhone[0] : null,
          eventVenueURL: eventVenueURL ? eventVenueURL[0] : null,
          eventVenueStateProvince: eventVenueStateProvince
            ? eventVenueStateProvince[0]
            : null,
        },
      },
      { upsert: true }
    );

    //console.log("Venue data saved to the database.");
    res.status(200).send("Venue data saved to the database.");
  } catch (error) {
    console.error("Error saving venue data to the database:", error);
    res.status(500).send("Error saving venue data to the database");
  }
});
// Route to fetch combined data from the combinedData collection
router.get("/events", async (req, res) => {
  try {
    console.log("Fetching events data from the database...");

    // Fetch events data from the events collection
    const eventsData = await events.find({}).toArray();
    //console.log("Fetched events data from the database:", eventsData);

    res.json(eventsData);
  } catch (error) {
    //console.error("Error fetching events data from the database:", error);
    res
      .status(500)
      .json({ error: "Error fetching events data from the database" });
  }
});

router.get("/venues", async (req, res) => {
  try {
    console.log("Fetching venues data from the database...");

    // Fetch venues data from the venues collection
    const venuesData = await venues.find({}).toArray();
    console.log("Fetched venues data from the database:", venuesData);
    console.log("venuesData", venuesData);

    res.json(venuesData);
  } catch (error) {
    console.error("Error fetching venues data from the database:", error);
    res
      .status(500)
      .json({ error: "Error fetching venues data from the database" });
  }
});

// Route to create and save combined data to the eventData collection
router.post("/combinedData", async (req, res) => {
  try {
    console.log("Creating and saving combined data...");

    // Fetch events and venues data
    const eventsData = await events.find({}).toArray();
    const venuesData = await venues.find({}).toArray();

    if (!eventsData.length || !venuesData.length) {
      throw new Error("No events or venues data found");
    }

    for (let i = 0; i < eventsData.length; i++) {
      console.log("eventsData", eventsData[i].eventVenueId);
      for (let j = 0; j < venuesData.length; j++) {
        console.log("venuesData", venuesData[j].venueId);
        if (eventsData[i].eventVenueId == venuesData[j].venueId) {
          console.log("Match found");
          const combinedData = {
            ...eventsData[i],
            venue: venuesData[j],
          };

          // Omit _id field to allow MongoDB to generate a new unique identifier
          delete combinedData._id;

          // Update or insert the combined data to the eventData collection
          await eventData.updateOne(
            { eventId: eventsData[i].eventId },
            { $set: combinedData },
            { upsert: true }
          );
        }
      }
    }

    console.log("Combined data saved to the eventData collection.");
    res.status(200).send("Combined data saved to the eventData collection.");
  } catch (error) {
    console.error("Error saving combined data:", error);
    res.status(500).send("Error saving combined data");
  }
});

router.get("/combinedData", async (req, res) => {
  try {
    console.log("Fetching combined data from the eventData collection...");

    // Call the POST request to fetch and save combined data
    const postResponse = await fetch(
      "http://localhost:8080/posts/combinedData",
      {
        method: "POST",
      }
    );

    if (!postResponse.ok) {
      throw new Error("Failed to fetch combined data");
    }

    const combinedData = await eventData.find({}).toArray();
    //console.log("Fetched combined data from the database:", combinedData);

    // Send the combinedData as the response
    res.json(combinedData);
  } catch (error) {
    console.error("Error fetching combined data from the database:", error);
    res
      .status(500)
      .json({ error: "Error fetching combined data from the database" });
  }
});

module.exports = router;
