import React, { useState, useEffect } from "react";

const EventDetails = () => {
  const [events, setEvents] = useState([]);// Stores event data fetched from API
  const [showMoreIndex, setShowMoreIndex] = useState(null);// Tracks which event's content should be expanded
  const [plainTextContent, setPlainTextContent] = useState([]);// Stores plain text content of events

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const url = `http://localhost:8080/posts/combinedData`;
      const eventsResponse = await fetch(url, {
        method: "GET",
      });
      // Check if response is ok
      if (!eventsResponse.ok) {
        throw new Error("Failed to fetch events");
      }
      // Parse response data to JSON
      const eventsData = await eventsResponse.json();
      //console.log("Fetched events data:", eventsData);

      // Update state with fetched events data
      setEvents(eventsData);
      // Extract plain text content from HTML and update state
      setPlainTextContent(
        eventsData.map((event) => event.eventContent.replace(/<[^>]+>/g, ""))
      );
    } catch (error) {
       // Log error if fetching data fails
      console.error("Error fetching data:", error);
    }
  };
  // Function to toggle show more/less for event content
  const toggleShowMore = (index) => {
    setShowMoreIndex((prevIndex) => (prevIndex === index ? null : index));
  };
 // JSX markup to render event details
  return (
    <div>
      <h1>Event List</h1>
      {events.map((event, index) => (
        <div key={index}>
          {event.eventContent.includes("<img") && (
            <img
              src={
                event.eventContent.match(/<img[^>]+src="([^">]+)"/)?.[1] || ""
              }
              alt="Event"
            />
          )}
          <h2>{event.eventTitle}</h2>
          <p>
            {showMoreIndex === index
              ? plainTextContent[index]
              : plainTextContent[index].substring(0, 200)}
            {plainTextContent[index].length > 200 && (
              <button onClick={() => toggleShowMore(index)}>
                {showMoreIndex === index ? "Show less" : "Show more"}
              </button>
            )}
          </p>
          <p>Date: {event.eventStartDate}</p>
          <p>End Date: {event.eventEndDate}</p>
          <p>
            Tags: {event.categories && Object.keys(event.categories).join(", ")}
          </p>
          {/* Display venue details if found */}
          {event.venue && (
            <div>
              <p>{event.venue.venueTitle}</p>
              <p>Address: {event.venue.eventVenueAddress}</p>
              <p>City: {event.venue.eventVenueCity}</p>
              <p>Country: {event.venue.eventVenueCountry}</p>
              {/* Add more venue details as needed */}
            </div>
          )}
          {index !== events.length - 1 && <hr />}
        </div>
      ))}
    </div>
  );
};

export default EventDetails;
