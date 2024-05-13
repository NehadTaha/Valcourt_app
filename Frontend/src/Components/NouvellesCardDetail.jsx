import "../Styles/details.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NouvellesCardDetail = ({ nouvelless, nouvellesID, setIsDetail, imageURL }) => {
  // state variable of details content
  const [nouvellesData, setnouvellesData] = useState({
    title: "",
    date: "",
    time: "",
    imageUrl: "",
    description: "",
  });

  useEffect(() => {
    // Find the nouvelles with the specified eventID
    const nouvelles = nouvelless.find((nouvelles) => nouvelles.nouvellesId === nouvellesID);

    // If nouvelles is found, set the eventData state with its data
    if (nouvelles) {
      setnouvellesData({
        title: nouvelles.nouvellesTitle,
        imageUrl:
          nouvelles.nouvellesContent.includes("<img") &&
          (nouvelles.nouvellesContent.match(/<img[^>]+src="([^">]+)"/)?.[1] || ""),
        description: nouvelles.nouvellesContent.replace(/<[^>]+>/g, ""),
      });
    }
  }, [nouvelless, nouvellesID, imageURL]); // Re-run effect when events or eventID changes

  const navigate = useNavigate();

  // makes the page stack on "back" work for desktop
  const handlePopState = (nouvelles) => {
    if (nouvelles.state === null) {
    } else {
      setIsDetail(false);
      window.removeEventListener("popstate", handlePopState);
      navigate("/");
    }
  };

  window.addEventListener("popstate", handlePopState);

  // make the back button go to nouvelles page
  const handleBack = () => {
    setIsDetail(false);
    navigate("/nouvelles");
  };

  return (
    <>
      <div className="detailBlock">
        <p className="backButton mt-3" onClick={handleBack}>
          Retour
        </p>
        <h1 className="me-5 ms-5 mt-3">{nouvellesData.title}</h1>
        <img
          className="imageContainer pt-3"
          id="imageContainer"
          src={nouvellesData.imageUrl}
          alt=""
        ></img>
        <p className="pDesc content-text-font wrap-url">
          {nouvellesData.description}
        </p>
      </div>
    </>
  );
};

export default NouvellesCardDetail;
