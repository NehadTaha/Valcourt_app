import "../Styles/EventBody.css";

const Card = ({
  key, // Add the key prop
  title,
  description,
  date,
  isLoggedIn,
  setIsDetail,
  cardId,
  setEventId,
}) => {
  const months = {
    "01": "January",
    "02": "Febuary",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    10: "October",
    11: "November",
    12: "December",
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
    <div key={key} className="customCard">
      {" "}
      {/* Add key prop here */}
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
        <button>Subscribe</button>
      ) : (
        <button>Login to Subscribe</button>
      )}
    </div>
  );
};

export default Card;
