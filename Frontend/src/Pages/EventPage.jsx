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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userTags = await getUserTags(); // Get user tags
      console.log("User tags:", userTags);

      // Check if userTags array is empty
      if (userTags.length === 0) {
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
        {console.log("logged: ", isLoggedIn)}

        <section
          class={
            isDetail
              ? "content-container detailsContainerGrid"
              : "content-container"
          }
        >
          {isDetail ? (
            <div></div>
          ) : (
            <Dropdown updateFilteredEvents={fetchData} />
          )}

          <div
            class={
              isDetail ? "content-card detailsContent-Card" : "content-card"
            }
          >
            {events.map((event, index) => {
              return isDetail ? (
                <CardDetail
                  title={event.eventTitle}
                  time={""}
                  description={plainTextContent[index]}
                  date={event.eventStartDate}
                  imageUrl={
                    event.eventContent.includes("<img") && (
                      <img
                        src={
                          event.eventContent.match(
                            /<img[^>]+src="([^">]+)"/
                          )?.[1] || ""
                        }
                        alt="Event"
                      />
                    )
                  }
                  location={event.venue.eventVenueAddress}
                  phone={""}
                  setIsDetail={setIsDetail}
                ></CardDetail>
              ) : (
                <Card
                  title={event.eventTitle}
                  description={plainTextContent[index].substring(0, 200)}
                  date={event.eventStartDate}
                  isLoggedIn={isLoggedIn}
                  setIsDetail={setIsDetail}
                ></Card>
              );
            })}
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}

export default EventPage;
