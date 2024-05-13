import "../Styles/EventBody.css";

const ProjetCard = ({
  title,
  description,
  date,
  imageUrl, // Corrected prop name
  setIsDetail,
  cardId,
  setProjectId,
}) => {
 
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
    10: "Octobre",
    11: "Novembre",
    12: "Décembre",
  };

  //set default values before page gets hydrated
  let day = "01";
  let month = "January";
  let year = "2024";
  let desc = "";

  const setDate = () => {
    const token = date.split("-");
    const dayConversion = token[2].split(" ");
    
    day = dayConversion[0];
    for (const key in months) {
      if (key === token[1]) {
        month = months[key];
      }
    }
    year = token[0];
   
  };

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
  setDate();
  setDesc();
  return (
    <div className="container">
      <div className="customCard">
        <div>
          <p className="title" /*onClick={handleDetailClick}*/>
            {title}
          </p>
          {/* Access imageUrl prop directly */}
          <img
            src={imageUrl}
            alt="event Logo"
            className="card-image img-thumbnail"
          />
          <p className="content" /*onClick={handleDetailClick}*/>
            {desc + "..."}
          </p>
        </div>
        <div className="example-date" /*onClick={handleDetailClick}*/>
          <span className="day">{day}</span>
          <span className="month">{month}</span>
          <span className="year">{year}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjetCard;
