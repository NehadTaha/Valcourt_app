const express = require("express");
const bodyParser = require("body-parser");
const { client } = require("../database/database");
const { ObjectId } = require("mongodb");
const { sendEventTopicNotification } = require("../email");

const database = client.db("valcourtApp");
const events = database.collection("events");
const venues = database.collection("venues");
const nouvellesCollection = database.collection("nouvelles");
const eventData = database.collection("combinedData");
const projects = database.collection("projects");

const router = express.Router();
router.use(bodyParser.json());

// Webhook endpoint to receive payloads from WordPress and save them to the database
router.post("/webhook", async (req, res) => {
  try {
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
        $inc: {updatedCount: 1}
      },
      { upsert: true }
    );

    // Send an email notification to all user with the relevant topics
    sendEventTopicNotification(eventId)

    //Sorting the events by date
    const sortedEvents = await events
      .find({})
      .sort({ eventStartDate: -1 })
      .toArray();
    res.status(200).json(sortedEvents);
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
    const eventsData = await events
      .sort({ eventStartDate: -1 })
      .find({})
      .toArray();
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
    // Fetch combined data from the eventData collection and sort by eventStartDate in descending order
    const sortedCombinedData = await eventData
      .find({})
      .sort({ eventStartDate: -1 })
      .toArray();

    res.status(200).json(sortedCombinedData);
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

    const combinedData = await eventData
      .find({})
      .sort({ eventStartDate: -1 })
      .toArray();
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
    const data = req.body;
    const { post, post_meta, taxonomies } = data;
    const {
      ID: projectId,
      post_title: projectTitle,
      post_content: projectContent,
      post_date: projectDate,
    } = post;

    const { category: postProjectCategory } = taxonomies;
    const projectCategory = postProjectCategory || {};

    // Check if the project with the given projectId already exists in the database
    const existingProject = await projects.findOne({ projectId: projectId });

    if (existingProject) {
      // If the project exists, update it
      await projects.updateOne(
        { projectId: projectId },
        {
          $set: {
            projectTitle,
            projectContent,
            projectDate: projectDate ? projectDate : null,
            projectCategory: projectCategory ? projectCategory : null,
          },
        }
      );
    } else {
      // If the project does not exist, create a new one
      await projects.insertOne({
        projectId,
        projectTitle,
        projectContent,
        projectDate: projectDate ? projectDate : null,
        projectCategory: projectCategory ? projectCategory : null,
      });
    }
    // Apply sorting after updating or inserting the data
    const sortedProjects = await projects
      .find({})
      .sort({ projectDate: -1 })
      .toArray();

    res.status(200).json(sortedProjects);
  } catch (error) {
    console.error("Error getting posts from wordpress:", error);
    res.status(500).send("Error getting posts from wordpress");
  }
});

router.get("/projets", async (req, res) => {
  try {
    const projectsData = await projects
      .find({})
      .sort({ projectDate: -1 })
      .toArray();
    res.json(projectsData);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching projects data from the database" });
  }
});

//Router to delete the deleted projects in webhook
router.post("/webhook/deleteProjets", async (req, res) => {
  try {
    const { post } = req.body;
    const { ID: projectId } = post;

    // Delete the project from the projects collection
    await projects.deleteOne({ projectId });

    res.status(200).send("Project data deleted from the database.");
  } catch (error) {
    console.error("Error deleting project data from the database:", error);
    res.status(500).send("Error deleting project data from the database");
  }
});

// Webhook endpoint to receive payloads from WordPress and save them to the database
router.post("/nouvelles", async (req, res) => {
  try {
    console.log("Received payload:", req.body);

  // Extract the desired data from the payload
  const { post, taxonomies } = req.body;
  const {
    ID: postId,
    post_name: postName,
    post_date: postDate,
    post_modified: postModified,
    post_content: postContent,
    post_thumbnail: postThumbnail // Add post_thumbnail to the destructuring
  } = post;


    // Check if the post is in the "nouvelles" category
    const { category } = taxonomies;
    const isNouvellesCategory = category && category.nouvelles;

    // If the post is not in the "nouvelles" category, return without saving to the database
    if (!isNouvellesCategory) {
      console.log("Post is not in the 'nouvelles' category. Skipping saving to the database.");
      return res.status(200).send("Post data not saved to the database.");
    }

    // Update or insert the post data to the database
    await savePostToDatabase({
      postId,
      postName,
      postDate: postDate ? new Date(postDate.split('T')[0]) : null, // Convert postDate to Date object if present, taking only the date part
      postModified: postModified ? new Date(postModified.split('T')[0]) : null, // Convert postModified to Date object if present
      postContent,
      postThumbnail: postThumbnail ? `https://valcourt2030.org/wp-content/uploads/2023/04/social-media-3758364_1920-1080x461.jpg` : null // Replace URL_TO_YOUR_IMAGE with the actual URL
    });

    res.status(200).send("Post data saved to the database.");
  } catch (error) {
    console.error("Error saving post data to the database:", error);
    res.status(500).send("Error saving post data to the database");
  }
});

// Function to save post data to the database
async function savePostToDatabase(postData) {
  // Implement your database saving logic here
  console.log("Saving post data to the database:", postData);
  // Example MongoDB usage:
  await database.collection("nouvelles").updateOne({ postId: postData.postId }, { $set: postData }, { upsert: true });
}

// GET method to retrieve all data from the "nouvelles" collection
router.get("/nouvelles", async (req, res) => {
  try {
    const nouvellesData = await nouvellesCollection.find({}).toArray(); // Change variable name
    res.json(nouvellesData);
  } catch (error) {
    console.error("Error retrieving nouvelles:", error);
    res.status(500).send("Error retrieving nouvelles");
  }
});


module.exports = router;
