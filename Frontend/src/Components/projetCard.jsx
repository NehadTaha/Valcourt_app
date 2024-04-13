import { useState } from "react";
import "../Styles/EventBody.css";
import { useNavigate } from "react-router-dom";
import images from "../Img/R.jpg";

const ProjetCard = ({
  title,
  description,
  image, // New prop for image URL

  isLoggedIn,
  setIsDetail,
  cardId,
  setEventId,
  isSubbed,
}) => {
  const [isDisable, setIsDisable] = useState(isSubbed);

  let desc = "";

  const navigate = useNavigate();

  const setDesc = () => {
    const token = description.split(".");
    desc = token[0];
  };

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

  const handleDetailClick = () => {
    setIsDetail(true);
    setEventId(cardId);
    scrollToTop();
  };

  const handleSub = async () => {
    const sub = `http://localhost:8080/userInfo/subscribe`;
    try {
      const token = localStorage.getItem("token");
      console.log(cardId);
      const response = await fetch(sub, {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ eventId: cardId }),
      });
      const data = await response.json();
      //console.log(data);
      setIsDisable(true);
    } catch (e) {
      console.log(e);
    }
  };

  setDesc();
  return (
    <div className="container">
      <div className="customCard">
        <img src={images} alt="image" className="card-image img-thumbnail" />
        <div>
          <p className="title" onClick={handleDetailClick}>
            {title}
          </p>
          <p className="content" onClick={handleDetailClick}>
            {desc + "..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjetCard;
