import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Card from "../Components/Card";
import "../Styles/font.css";
import "../Styles/EventBody.css";
import Dropdown from "../Components/Dropdown";
import { useEffect, useState } from "react";
import CardDetail from "../Components/CardDetail";
import getUserTags from "../Middleware/getUserTags";

function FilteredEvents() {
  const [events, setEvents] = useState([]);
  const [plainTextContent, setPlainTextContent] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDetail, setIsDetail] = useState(false);

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
      const userTags = await getUserTags(); // Get user tags
      console.log("User tags:", userTags);

      const lowerCaseUserTags = userTags.map((tag) => tag.toLowerCase()); // Convert user tags to lowercase
      const filteredEvents = eventsData.filter((event) => {
        const eventCategories = Object.keys(event.categories);
        console.log("eventCategory:", eventCategories); // Get values of categories object
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
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <Navbar setIsLoggedIn={setIsLoggedIn} />
      <section
        className={`content-container ${
          isDetail ? "detailsContainerGrid" : "content-container"
        }`}
      >
        {isDetail ? <div></div> : <Dropdown updateFilteredEvents={fetchData} />}

        <div
          className={`content-card ${isDetail ? "detailsContent-Card" : ""}`}
        >
          {events.map((event, index) => (
            <Card
              key={event.eventId} // Use a unique identifier as the key
              title={event.eventTitle}
              description={plainTextContent[index].substring(0, 200)}
              date={event.eventStartDate}
              isLoggedIn={isLoggedIn}
              setIsDetail={setIsDetail}
            />
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default FilteredEvents;
