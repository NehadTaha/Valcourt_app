const express = require("express");
const bodyParser = require("body-parser");
const { client } = require("../database/database");
const { ObjectId } = require("mongodb");

const database = client.db("valcourtApp");
const events = database.collection("events");
const venues = database.collection("venues");
const eventData = database.collection("combinedData");
const projects = database.collection("projects");

const router = express.Router();
router.use(bodyParser.json());

// Webhook endpoint to receive payloads from WordPress and save them to the database
router.post("/webhook", async (req, res) => {
  try {
    console.log("Received payload:", req.body);
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
      _EventURL: eventURL,
    } = post_meta;
    const { post_tag: postEventTag } = taxonomies;
    const eventTag = postEventTag || {};
    console.log("tag", eventTag);

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
          eventTag: eventTag ? eventTag : null,
          eventURL: eventURL ? eventURL[0] : null,
        },
      },
      { upsert: true }
    );
    res.status(200).send("Post data saved to the database.");
  } catch (error) {
    console.error("Error saving post data to the database:", error);
    res.status(500).send("Error saving post data to the database");
  }
});

// Webhook endpoint to receive payloads for venues and save them to the database
router.post("/webhook/venues", async (req, res) => {
  try {
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

    res.status(200).send("Venue data saved to the database.");
  } catch (error) {
    console.error("Error saving venue data to the database:", error);
    res.status(500).send("Error saving venue data to the database");
  }
});
// Route to fetch combined data from the combinedData collection
router.get("/events", async (req, res) => {
  try {
    // Fetch events data from the events collection
    const eventsData = await events.find({}).toArray();
    res.json(eventsData);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching events data from the database" });
  }
});

router.get("/webhook/venues", async (req, res) => {
  try {
    // Fetch venues data from the venues collection
    const venuesData = await venues.find({}).toArray();
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
    // Fetch events and venues data
    const eventsData = await events.find({}).toArray();
    const venuesData = await venues.find({}).toArray();

    if (!eventsData.length || !venuesData.length) {
      throw new Error("No events or venues data found");
    }

    for (let i = 0; i < eventsData.length; i++) {
      for (let j = 0; j < venuesData.length; j++) {
        if (eventsData[i].eventVenueId == venuesData[j].venueId) {
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
    res.status(200).send("Combined data saved to the eventData collection.");
  } catch (error) {
    console.error("Error saving combined data:", error);
    res.status(500).send("Error saving combined data");
  }
});

router.get("/combinedData", async (req, res) => {
  try {
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
    // Send the combinedData as the response
    res.json(combinedData);
  } catch (error) {
    console.error("Error fetching combined data from the database:", error);
    res
      .status(500)
      .json({ error: "Error fetching combined data from the database" });
  }
});
//Router to fetch the deleted posts in webhook
// Router to delete a post/event and update venue and combined data accordingly
router.post("/webhook/delete", async (req, res) => {
  try {
    const { post } = req.body;
    const { ID: eventId } = post;

    // Delete the event from the events collection
    await events.deleteOne({ eventId });

    // Find the corresponding venue for the deleted event
    const deletedEventData = await eventData.findOne({ eventId });
    if (deletedEventData) {
      const { venueId } = deletedEventData;

      // Update the combined data collection by removing the deleted event
      await eventData.deleteOne({ eventId });

      // Check if the venue exists in the venues collection
      const venue = await venues.findOne({ venueId });
      if (venue) {
        // If the venue exists, remove the reference to the deleted event
        const updatedVenue = { ...venue };
        delete updatedVenue.events[eventId];

        // Update the venues collection with the modified venue data
        await venues.updateOne({ venueId }, { $set: updatedVenue });
      }
    }

    res.status(200).send("Post data deleted from the database.");
  } catch (error) {
    console.error("Error deleting post data from the database:", error);
    res.status(500).send("Error deleting post data from the database");
  }
});
//Router to get posts from word-press
router.post("/webhook/projets", async (req, res) => {
  try {
    console.log("Received payload:", req.body);
    const data = req.body;
    console.log(data);

    const { post, post_meta, taxonomies } = data;
    const {
      ID: projectId,
      post_title: projectTitle,
      post_content: projectContent,
      post_date: projectDate,
    } = post;

    const { post_category: postProjectCategory } = taxonomies;
    const projectCategory = postProjectCategory || {};
    await projects.updateOne(
      { projectId: projectId },
      {
        $set: {
          projectTitle,
          projectContent,
          projectDate: projectDate ? projectDate : null,
          projectCategory: projectCategory ? projectCategory : null,
        },
      },
      { upsert: true }
    );
    res.status(200).send("Post data saved to the database.");
  } catch (error) {
    console.error("Error getting posts from wordpress:", error);
    res.status(500).send("Error getting posts from wordpress");
  }
});
router.get("/projets", async (req, res) => {
  try {
    const projectsData = await projects.find({}).toArray();
    res.json(projectsData);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching projects data from the database" });
  }
});

module.exports = router;
