import "../Styles/EventBody.css";

const Card = ({ prop, isLoggedIn, setIsDetail }) => {
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
    "10": "October",
    "11": "November",
    "12": "December",
  };

  let day = "01";
  let month = "January";
  let year = "2024";


  const setDate = () => {
    const token = prop.date.split("/");
    day = token[0];
    for (const key in months) {
      if (key === token[1]) {
        month = months[key];
      }
    }
    year = token[2];
  };

  function scrollToTop() {
    let scrollStep = 30
    
    function scrollAnimation() {
      if (window.scrollY !== 0) {

        window.scrollBy(0, -scrollStep);
        requestAnimationFrame(scrollAnimation);
      }
    }
    
    scrollAnimation();
  }

  const handleClick = ()=>{
    setIsDetail(true)

   scrollToTop()
  }

  setDate();

  return (
    <div className="customCard">
      <p className="title" onClick={handleClick}>{prop.title}</p>
      <p className="content" onClick={handleClick}>{prop.description}</p>
      <div className="example-date" onClick={handleClick}>
        <span className="day">{day}</span>
        <span className="month">{month}</span>
        <span className="year">{year}</span>
      </div>
      {isLoggedIn?<button>Subscribe</button>: <button>Login to Subscribe</button>}
    </div>
  );
};

export default Card;
