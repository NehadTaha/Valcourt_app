import { useState } from "react";
import "../Styles/EventBody.css";
import { useNavigate } from "react-router-dom";

const ProjetCard = ({
  title,
  description,
  imageUrl, // Corrected prop name
  setIsDetail,
  cardId,
  setProjectId,
}) => {
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
    setProjectId(cardId);
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
          {/* Access imageUrl prop directly */}
          <img
            src={imageUrl}
            alt="image"
            className="card-image img-thumbnail"
          />
          <p className="content" onClick={handleDetailClick}>
            {desc + "..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjetCard;
