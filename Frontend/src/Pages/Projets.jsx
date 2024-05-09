import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "../Styles/font.css";
import "../Styles/EventBody.css";
import { useEffect, useState } from "react";
import ProjetCard from "../Components/projetCard";
import ProjetCardDetail from "../Components/ProjetCardDetail";

function ProjectPage() {
  const [projects, setProjects] = useState([]);
  const [plainTextContent, setPlainTextContent] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDetail, setIsDetail] = useState(false);
  const [projectId, setProjectId] = useState("");

  useEffect(() => {
    fetchData();
  }, [isLoggedIn]);

  const fetchData = async () => {
    try {
      const url = `http://localhost:8080/posts/projets`;
      const projectsRespond = await fetch(url, {
        method: "GET",
      });
      if (!projectsRespond.ok) {
        throw new Error("Failed to fetch projects");
      }
      const projectsData = await projectsRespond.json();
      setProjects(projectsData);

      setPlainTextContent(
        projectsData.map((project) =>
          project.projectContent.replace(/<[^>]+>/g, "")
        )
      );
      // Get user tags
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className="d-flex flex-column min-vh-100 w-100 text-center content-items-center">
        <Navbar setIsLoggedIn={setIsLoggedIn} className="col-12" />

        <div
          className={
            isDetail
              ? "content-card detailsContent-Card"
              : isLoggedIn
              ? "content-card"
              : "content-card noUser-justify"
          }
        >
          {isDetail ? (
            <ProjetCardDetail
              projects={projects} // Assuming you want to display details for the first event
              projectID={projectId} // Assuming eventId is a property of event object
              setIsDetail={setIsDetail}
            />
          ) : projects != [] ? (
            projects.map((project, index) => {
              return (
                <div className="">
                  <ProjetCard
                    key={project.projectId}
                    title={project.projectTitle}
                    imageUrl={
                      project.projectContent.match(
                        /<img[^>]+src="([^">]+)"/
                      )?.[1] || ""
                    }
                    description={plainTextContent[index]}
                    date={project.projectDate}
                    setIsDetail={setIsDetail}
                    setProjectId={setProjectId}
                    cardId={project.projectId}
                  ></ProjetCard>
                </div>
              );
            })
          ) : (
            <h2>Aucun événement pour le moment !</h2>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
}

export default ProjectPage;
