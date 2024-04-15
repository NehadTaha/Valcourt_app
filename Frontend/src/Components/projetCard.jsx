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

  setDesc();
  return (
    <div className="container">
      <div className="customCard">
        <div>
          <p className="title" onClick={handleDetailClick}>
            {title}
          </p>
          <img src={images} alt="image" className="card-image img-thumbnail" />
          <p className="content" onClick={handleDetailClick}>
            {desc + "..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjetCard;
