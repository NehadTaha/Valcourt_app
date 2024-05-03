import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import "../Styles/style.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Footer from "../Components/Footer";
import Logo from "../Components/Logo";
import ProjetCard from "../Components/projetCard";

function NouvellesPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDetail, setIsDetail] = useState(false);
  const [nouvelles, setNouvelles] = useState([]);
  const [nouvellesId, setNouvellesId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/posts/nouvelles');
        if (!response.ok) {
          throw new Error('Failed to fetch nouvelles');
        }
        const data = await response.json();
        setNouvelles(data);
      } catch (error) {
        console.error('Error fetching nouvelles:', error);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <div className="d-flex flex-column min-vh-100 text-center content-items-center">
      <Navbar setIsLoggedIn={setIsLoggedIn} />
      <Logo />
      <section
        className={
          isDetail
            ? "content-container detailsContainerGrid"
            : isLoggedIn
            ? "content-container d-flex align-items-center justify-content-center"
            : "content-container-noUser d-flex align-items-center justify-content-center"
        }
      >
        <div className="row">
          <div className="col-md-6 offset-md-3"> {/* Adjust the column size and offset */}
            {nouvelles.map(nouvelle => (
              <ProjetCard
                key={nouvelle.postId} // Ensure each component has a unique key
                title={nouvelle.postName}
                description={nouvelle.postContent}
                date={nouvelle.postDate}
                isLoggedIn={isLoggedIn}
                setIsDetail={setIsDetail}
                setNouvellesId={setNouvellesId}
                cardId={nouvelle.postId}
                isSubbed={null}
              />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default NouvellesPage;
