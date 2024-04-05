import "../Styles/EventBody.css";

const Card = ({
  title,
  description,
  date,
  isLoggedIn,
  setIsDetail,
  cardId,
  setEventId,
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
    "10": "Octobre",
    "11": "Novembre",
    "12": "Décembre",
  };

  let day = "01";
  let month = "January";
  let year = "2024";

  let desc = "";

  const setDate = () => {
    const token = date.split("-");
    const dayConversion = token[2].split(" ");
    console.log(dayConversion);
    day = dayConversion[0];
    for (const key in months) {
      if (key === token[1]) {
        month = months[key];
      }
    }
    year = token[0];
    console.log(token);
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

  const handleClick = () => {
    setIsDetail(true);
    setEventId(cardId);
    scrollToTop();
  };

  setDate();
  setDesc();

  console.log(desc);

  return (
    <div className="customCard">
      <p className="title" onClick={handleClick}>
        {title}
      </p>
      <p className="content" onClick={handleClick}>
        {desc + "..."}
      </p>
      <div className="example-date" onClick={handleClick}>
        <span className="day">{day}</span>
        <span className="month">{month}</span>
        <span className="year">{year}</span>
      </div>
      {isLoggedIn ? (
        <button>S'inscrire à l'évenement</button>
      ) : (
        <button>S'inscrire à Valcourt2030</button>
      )}
    </div>
  );
};

export default Card;
