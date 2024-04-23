import "../Styles/details.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProjetCardDetail = ({ projects, projectID, setIsDetail, imageURL }) => {
  //state variable of details content
  const [projectData, setProjectData] = useState({
    title: "",
    date: "",
    time: "",
    imageUrl: "",
    description: "",
  });

  useEffect(() => {
    // Find the project with the specified eventID
    const project = projects.find((project) => project.projectId === projectID);
    console.log("project", project);
    // const date = project.projectDate.split(" ")[0];

    // If project is found, set the eventData state with its data
    if (project) {
      setProjectData({
        title: project.projectTitle,
        // date: `${formatteDate(date)}`,
        imageUrl:
          project.projectContent.includes("<img") &&
          (project.projectContent.match(/<img[^>]+src="([^">]+)"/)?.[1] || ""),
        description: project.projectContent.replace(/<[^>]+>/g, ""),
      });
      console.log("project", project);
    }
  }, [projects, projectID, imageURL]); // Re-run effect when events or eventID changes

  const navigate = useNavigate();

  //makes the page stack on "back" work for desktop
  const handlePopState = (project) => {
    if (project.state === null) {
    } else {
      setIsDetail(false);
      window.removeEventListener("popstate", handlePopState);
      navigate("/");
    }
  };

  window.addEventListener("popstate", handlePopState);

  //make the back button go to project page
  const handleBack = () => {
    setIsDetail(false);
    navigate("/projets");
  };

  return (
    <>
      <div className="detailBlock">
        <p className="backButton mt-4" onClick={handleBack}>
          Retour
        </p>
        <h1 className="m-4">{projectData.title}</h1>
        <div className="datetime">
          {/* <h3 style={{ marginRight: "5px" }}>Posté le : {projectData.date}</h3> */}
        </div>
        <img
          className="imageContainer pt-3"
          id="imageContainer"
          src={projectData.imageUrl}
          alt=""
        ></img>
        <p className="pDesc content-text-font">{projectData.description}</p>
      </div>
    </>
  );
};

export default ProjetCardDetail;
