import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Card from "../Components/Card";
import "../Styles/font.css";
import "../Styles/EventBody.css";
import Dropdown from "../Components/Dropdown";
import { useEffect, useState } from "react";
import CardDetail from "../Components/CardDetail";
import getUserTags from "../Middleware/getUserTags";
import { useNavigate } from "react-router-dom";

function EventPage() {
  const [events, setEvents] = useState([]); //State for storing event data
  const [plainTextContent, setPlainTextContent] = useState([]); // State for plain text content of events

  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for user login status
  const [isDetail, setIsDetail] = useState(false); // State for displaying event detail view
  const [eventId, setEventId] = useState(""); //State for storing selected event ID

  const [subbedEvents, setSubbedEvents] = useState([]); // State for storing subscribed events

  const navigate = useNavigate();

  // Effect hook to fetch subscribed events and event data on component mount or login state change
  useEffect(() => {
    if (isLoggedIn) {
      try {
        let token = localStorage.getItem("token");
        const fetchSubData = async () => {
          const url = `http://localhost:8080/userInfo/subbedEvent`;
          const eventsResponse = await fetch(url, {
            method: "GET",
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          });
          const eventsData = await eventsResponse.json();

          setSubbedEvents(eventsData);
        };
        fetchSubData();
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [isLoggedIn]);

  // Function to fetch event data
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
      setEvents(eventsData);
      setPlainTextContent(
        eventsData.map((event) => event.eventContent.replace(/<[^>]+>/g, ""))
      );
      // Get user tags
      const userTags = await getUserTags();
      if (userTags.length === 0) {
        // User has no tags, show all events
        setEvents(eventsData);
        setPlainTextContent(
          eventsData.map((event) => event.eventContent.replace(/<[^>]+>/g, ""))
        );
      } else {
        const lowerCaseUserTags = userTags.map((tag) => tag.toLowerCase());
        const filteredEvents = eventsData.filter((event) => {
          const eventTgas = Object.values(event.eventTag).map((event_tag) =>
            event_tag.name.toLowerCase()
          );
          for (let i = 0; i < eventTgas.length; i++) {
            for (let j = 0; j < lowerCaseUserTags.length; j++) {
              if (eventTgas[i] === lowerCaseUserTags[j]) {
                return true;
              }
            }
          }
          return false;
        });
        setEvents(filteredEvents);
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
  // JSX returned by EventPage component
  return (
    <>
      <div className="d-flex flex-column min-vh-100 text-center content-items-center">
        <Navbar setIsLoggedIn={setIsLoggedIn} />
        <section
          className={
            isDetail
              ? "content-container detailsContainerGrid"
              : isLoggedIn
              ? "content-container"
              : "content-container-noUser"
          }
          style={{ paddingTop: "40px" }}
        >
          {isDetail ? (
            <div></div>
          ) : (
            <Dropdown updateFilteredEvents={fetchData} />
          )}

          <div
            className={
              isDetail
                ? "content-card detailsContent-Card"
                : isLoggedIn
                ? "content-card"
                : "content-card noUser-justify"
            }
            style={{ paddingTop: "40px" }}
          >
            {isDetail ? (
              <CardDetail
                events={events} // Assuming you want to display details for the first event
                eventID={eventId} // Assuming eventId is a property of event object
                setIsDetail={setIsDetail}
              />
            ) : events.length >= 1 ? (
              events.map((event, index) => {
                let isSubbed =
                  subbedEvents.find(
                    (subbedEvent) => subbedEvent.eventId === event.eventId
                  ) !== undefined;

                //console.log({eventId:event.eventId})
                // console.log(subbedEvents)
                //console.log(isSubbed)
                return (
                  <Card
                    key={event.eventId}
                    title={event.eventTitle}
                    description={plainTextContent[index]}
                    date={event.eventStartDate}
                    isLoggedIn={isLoggedIn}
                    setIsDetail={setIsDetail}
                    setEventId={setEventId}
                    cardId={event.eventId}
                    isSubbed={isSubbed}
                  ></Card>
                );
              })
            ) : (
              <h2>Aucun événement pour le moment !</h2>
            )}
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}

export default EventPage;
