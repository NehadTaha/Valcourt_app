import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Card from "../Components/Card";
import "../Styles/font.css";
import "../Styles/EventBody.css";
import Dropdown from "../Components/Dropdown";
import { useEffect, useState } from "react";
import CardDetail from "../Components/CardDetail";
import getUserTags from "../Middleware/getUserTags";
import AdminCard from "../Components/AdminCard";
import { useNavigate } from "react-router-dom";

function AdminPage() {
  const [events, setEvents] = useState([]); // State for storing event data
  const [plainTextContent, setPlainTextContent] = useState([]);// State for plain text content of events

  const [isLoggedIn, setIsLoggedIn] = useState(false);// State for user login status
  const [isDetail, setIsDetail] = useState(false);// State for displaying event detail view
  const [eventId, setEventId] = useState("");// State for storing selected event ID
  const [isAdmin,setIsAdmin] = useState(false)

  const navigate = useNavigate()

  // Effect hook to fetch subscribed events and event data on component mount or login state change
  useEffect(() => {
    let token = ""
    function getUser() {
      if (localStorage.getItem("token")) {
        token = localStorage.getItem("token");
      }
    }
    const adminCheck = async ()=>{
        const userInfoUrl = "http://localhost:8080/userInfo/profile";
        const options = {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",// Setting Authorization header with token
          },
        };
  
        try {
          const response = await fetch(userInfoUrl, options);// Fetching user info
  
          const data = await response.json();// Parsing response JSON
  
          if (response.ok && data.admin) {
            setIsAdmin(true)
          } else {
            navigate("/")
          }
        } catch (error) {
          navigate("/")
        }
    }
    getUser()
    adminCheck()
    fetchData();
    
  }, [isLoggedIn]);

  // Function to fetch event data
  const fetchData = async () => {
    try{
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
      <div className="d-flex flex-column min-vh-100 text-center content-items-center admin-back">
        <Navbar setIsLoggedIn={setIsLoggedIn} />
        <section
          className="content-container-noUser"
        >
          <></>

          <div
            className="content-card"
          >
            {events.length >= 1 ? (
              events.map((event, index) => {
                return (
                  <AdminCard
                    key={event.eventId}
                    title={event.eventTitle}
                    description={plainTextContent[index]}
                    date={event.eventStartDate}
                    isLoggedIn={isLoggedIn}
                    setIsDetail={setIsDetail}
                    setEventId={setEventId}
                    cardId={event.eventId}
                    isAdmin={isAdmin}
                  ></AdminCard>
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

export default AdminPage;
