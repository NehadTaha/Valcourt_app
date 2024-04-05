import CardDetailFooter from "./CardDetailFooter";
import "../Styles/details.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CardDetail = ({ events, eventID, setIsDetail }) => {
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    time: "",
    imageUrl: "",
    description: "",
    phone: "",
    location: "",
  });

  useEffect(() => {
    // Find the event with the specified eventID
    const event = events.find((event) => event.eventId === eventID);

    // If event is found, set the eventData state with its data
    if (event) {
      setEventData({
        title: event.eventTitle,
        date: event.eventStartDate,
        imageUrl:
          event.eventContent.includes("<img") &&
          (event.eventContent.match(/<img[^>]+src="([^">]+)"/)?.[1] || ""),
        description: event.eventContent.replace(/<[^>]+>/g, ""),
        phone: event.venue.eventVenuePhone,
        location: event.venue.eventVenueAddress,
      });
    }
  }, [events, eventID]); // Re-run effect when events or eventID changes

  const navigate = useNavigate();

  const handlePopState = (event) => {
    if (event.state === null) {
    } else {
      setIsDetail(false);
      window.removeEventListener("popstate", handlePopState);
      navigate("/");
    }
  };

  window.addEventListener("popstate", handlePopState);

  const handleBack = () => {
    setIsDetail(false);
    navigate("/");
  };

  return (
    <>
      <div className="detailBlock">
        <p className="backButton" onClick={handleBack}>
          Retour
        </p>
        <h1>{eventData.title}</h1>
        <div className="datetime">
          <h3 style={{ marginRight: "5px" }}>{eventData.date}</h3>
          <h3>{eventData.time}</h3>
        </div>
        <img
          className="imageContainer"
          id="imageContainer"
          src={eventData.imageUrl}
        ></img>
        <p className="pDesc content-text-font">{eventData.description}</p>
        <CardDetailFooter
          location={eventData.location}
          phone={eventData.phone}
        ></CardDetailFooter>
      </div>
    </>
  );
};

export default CardDetail;
