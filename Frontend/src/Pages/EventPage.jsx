import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Card from "../Components/Card";
import "../Styles/font.css";
import "../Styles/EventBody.css";
import Dropdown from "../Components/Dropdown";
import { useEffect, useState } from "react";
import CardDetail from "../Components/CardDetail";

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

  return (
    <>
      <Navbar setIsLoggedIn={setIsLoggedIn} />
      {console.log("logged: ", isLoggedIn)}
      <section
        class={
          isDetail
            ? "content-container detailsContainerGrid"
            : "content-container"
        }
      >
        {isDetail ? <div></div> : <Dropdown />}

        <div
          class={isDetail ? "content-card detailsContent-Card" : "content-card"}
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
    </>
  );
}

export default EventPage;
