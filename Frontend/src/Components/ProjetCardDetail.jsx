import CardDetailFooter from "./CardDetailFooter";
import "../Styles/details.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProjetCardDetail = ({ events, eventID, setIsDetail }) => {
  //state variable of details content
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    time: "",
    imageUrl: "",
    description: "",
  });

  //convert date format in a more traditional format
  const formatteDate = (date) => {
    const dateObj = new Date(date);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return dateObj.toLocaleDateString("fr-FR", options);
  };

  useEffect(() => {
    // Find the event with the specified eventID
    const event = events.find((event) => event.eventId === eventID);
    const date = event.eventStartDate.split(" ")[0];
    const time = event.eventStartDate.split(" ")[1];
    const formattedTime = (time) => {
      const timeObj = new Date(`1970-01-01T${time}`);
      const options = {
        hour: "numeric",
        minute: "numeric",
      };
      return timeObj.toLocaleTimeString("fr-FR", options);
    };

    // If event is found, set the eventData state with its data
    if (event) {
      setEventData({
        title: event.eventTitle,
        date: `${formatteDate(date)} @  ${formattedTime(
          time
        )} - ${formattedTime(event.eventEndDate.split(" ")[1])}`,
        imageUrl:
          event.eventContent.includes("<img") &&
          (event.eventContent.match(/<img[^>]+src="([^">]+)"/)?.[1] || ""),
        description: event.eventContent.replace(/<[^>]+>/g, ""),
        phone: event.venue.eventVenuePhone,
        location: event.venue.eventVenueAddress,
        websiteURL: event.eventURL,
      });
      console.log("event", event);
    }
  }, [events, eventID]); // Re-run effect when events or eventID changes

  const navigate = useNavigate();

  //makes the page stack on "back" work for desktop
  const handlePopState = (event) => {
    if (event.state === null) {
    } else {
      setIsDetail(false);
      window.removeEventListener("popstate", handlePopState);
      navigate("/");
    }
  };

  window.addEventListener("popstate", handlePopState);

  //make the back button go to event page
  const handleBack = () => {
    setIsDetail(false);
    navigate("/");
  };

  return (
    <>
      <div className="detailBlock">
        <p className="backButton mt-4" onClick={handleBack}>
          Retour
        </p>
        <h1 className="m-4">{eventData.title}</h1>
        <div className="datetime">
          <h3 style={{ marginRight: "5px" }}>Posté le : {eventData.date}</h3>
          <h3>{eventData.time}</h3>
        </div>
        <img
          className="imageContainer pt-3"
          id="imageContainer"
          src={eventData.imageUrl}
          alt=""
        ></img>
        <p className="pDesc content-text-font">{eventData.description}</p>
        {/* <CardDetailFooter
          location={eventData.location}
          websiteURL={eventData.websiteURL}
          phone={eventData.phone}
        ></CardDetailFooter> */}
      </div>
    </>
  );
};

export default ProjetCardDetail;
