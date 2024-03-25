import React, { useState, useEffect } from "react";

const EventDetails = () => {
  const [events, setEvents] = useState([]);
  const [showMoreIndex, setShowMoreIndex] = useState(null);
  const [plainTextContent, setPlainTextContent] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const url = `http://localhost:8080/posts/combinedData`;
      const eventsResponse = await fetch(url, {
        method: "GET",
      });
      if (!eventsResponse.ok) {
        throw new Error("Failed to fetch events");
      }
      const eventsData = await eventsResponse.json();
      console.log("Fetched events data:", eventsData);

      setEvents(eventsData);
      setPlainTextContent(
        eventsData.map((event) => event.eventContent.replace(/<[^>]+>/g, ""))
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const toggleShowMore = (index) => {
    setShowMoreIndex((prevIndex) => (prevIndex === index ? null : index));
  };

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
