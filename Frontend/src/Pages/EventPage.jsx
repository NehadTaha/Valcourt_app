import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Card from "../Components/Card";
import "../Styles/font.css";
import "../Styles/EventBody.css";
import Dropdown from "../Components/Dropdown";
import { useEffect, useState } from "react";
import CardDetail from "../Components/CardDetail";
import getUserTags from "../Middleware/getUserTags";

function EventPage() {
  const [events, setEvents] = useState([]);
  const [showMoreIndex, setShowMoreIndex] = useState(null);
  const [plainTextContent, setPlainTextContent] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDetail, setIsDetail] = useState(false);
  const [eventId, setEventId] = useState("");

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
      // Get user tags
      const userTags = await getUserTags();
      console.log("User tags:", userTags);
      if (userTags.length === 0) {
        // User has no tags, show all events
        setEvents(eventsData);
        setPlainTextContent(
          eventsData.map((event) => event.eventContent.replace(/<[^>]+>/g, ""))
        );
      } else {
        // User has tags, filter events based on tags
        const url = `http://localhost:8080/posts/combinedData`;
        const eventsResponse = await fetch(url, {
          method: "GET",
        });
        if (!eventsResponse.ok) {
          throw new Error("Failed to fetch events");
        }
        const eventsData = await eventsResponse.json();
        console.log("Fetched events data:", eventsData);
        const lowerCaseUserTags = userTags.map((tag) => tag.toLowerCase());
        const filteredEvents = eventsData.filter((event) => {
          const eventCategories = Object.keys(event.categories);
          console.log("eventCategory:", eventCategories);
          for (let i = 0; i < eventCategories.length; i++) {
            for (let j = 0; j < lowerCaseUserTags.length; j++) {
              if (eventCategories[i] === lowerCaseUserTags[j]) {
                console.log("lowerCaseUserTags:", lowerCaseUserTags[j]);
                return true;
              }
            }
          }
          return false;
        });
        setEvents(filteredEvents);
        console.log("Filtered events:", filteredEvents);
        setPlainTextContent(
          filteredEvents.map((event) =>
            event.eventContent.replace(/<[^>]+>/g, "")
          )
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <>
      <div className="d-flex flex-column min-vh-100 text-center content-items-center">
        <Navbar setIsLoggedIn={setIsLoggedIn} />
        <section
          class={
            isDetail
              ? "content-container detailsContainerGrid"
              : isLoggedIn
              ? "content-container"
              : "content-container-noUser"
          }
        >
          {isDetail ? (
            <div></div>
          ) : (
            <Dropdown updateFilteredEvents={fetchData} />
          )}

          <div
            class={
              isDetail
                ? "content-card detailsContent-Card"
                : isLoggedIn
                ? "content-card"
                : "content-card noUser-justify"
            }
          >
            {isDetail ? (
              <CardDetail
                events={events} // Assuming you want to display details for the first event
                eventID={eventId} // Assuming eventId is a property of event object
                setIsDetail={setIsDetail}
              />
            ) : events != [] ? (
              events.map((event, index) => {
                return (
                  <Card
                    title={event.eventTitle}
                    description={plainTextContent[index]}
                    date={event.eventStartDate}
                    isLoggedIn={isLoggedIn}
                    setIsDetail={setIsDetail}
                    setEventId={setEventId}
                    cardId={event.eventId}
                  ></Card>
                );
              })
            ) : (
              <h2>No Event At The Moment!</h2>
            )}
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}

export default EventPage;
