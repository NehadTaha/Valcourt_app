import { useState } from "react";
import "../Styles/EventBody.css";
import {useNavigate} from 'react-router-dom'

const Card = ({
  title,
  description,
  date,
  isLoggedIn,
  setIsDetail,
  cardId,
  setEventId,
  isSubbed
}) => {
  //state variable to see the subscribe button disable onClick
  const [isDisable,setIsDisable] = useState(isSubbed)

  const months = {
    "01": "Janvier",
    "02": "Février",
    "03": "Mars",
    "04": "Avril",
    "05": "Mai",
    "06": "Juin",
    "07": "Juillet",
    "08": "Août",
    "09": "Septembre",
    "10": "Octobre",
    "11": "Novembre",
    "12": "Décembre",
  };

  //set default values before page gets hydrated
  let day = "01";
  let month = "January";
  let year = "2024";
  let desc = "";

  const navigate = useNavigate();

  //separate date string to asign to variables
  const setDate = () => {
    const token = date.split("-");
    const dayConversion = token[2].split(" ");
    //console.log(dayConversion);
    day = dayConversion[0];
    for (const key in months) {
      if (key === token[1]) {
        month = months[key];
      }
    }
    year = token[0];
    //console.log(token);
  };

  //take the first sentence from the event content
  const setDesc = () => {
    const token = description.split(".");
    desc = token[0];
  };

  //make the page srcoll to the top of the page
  function scrollToTop() {
    let scrollStep = 30;

    function scrollAnimation() {
      if (window.scrollY !== 0) {
        window.scrollBy(0, -scrollStep);
        requestAnimationFrame(scrollAnimation);
      }
    }

    scrollAnimation();
  }
  //on card click
  const handleDetailClick = () => {
    setIsDetail(true);
    setEventId(cardId);
    scrollToTop();
  };

  //update the subbedEvents for user in database and disable subscribe button click
  const handleSub = async ()=>{
 
      const sub = `http://localhost:8080/userInfo/subscribe`;
      try {
        const token = localStorage.getItem("token");
        console.log(cardId)
        const response = await fetch(sub, {
          method: "POST",
          credentials: "same-origin",
          headers: { "Content-Type": "application/json", Authorization: token ? `Bearer ${token}` : "",},
          body: JSON.stringify({ eventId: cardId }),
        });
        const data = await response.json();
        //console.log(data);
        setIsDisable(true)
      } catch (e) {
        console.log(e);
      }
  }

  //set date and content on page load
  setDate();
  setDesc();

  //component content
  return (
    <div className="customCard">
      <p className="title" onClick={handleDetailClick}>
        {title}
      </p>
      <p className="content" onClick={handleDetailClick}>
        {desc + "..."}
      </p>
      <div className="example-date" onClick={handleDetailClick}>
        <span className="day">{day}</span>
        <span className="month">{month}</span>
        <span className="year">{year}</span>
      </div>
      {isLoggedIn ? (
        isSubbed || isDisable?<div id={cardId} className="disabled">Abonné</div>:<button id={cardId} onClick={handleSub}>S'abonner</button>
      ) : (
        <button onClick={()=>{navigate('/login')}}>Connectez-vous pour vous abonner</button>
      )}
    </div>
  );
};

export default Card;
