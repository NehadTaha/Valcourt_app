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
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/posts/nouvelles')
      .then(response => response.json())
      .then(data => setNouvelles(data))
      .catch(error => console.error('Error fetching nouvelles:', error));
  }, []); //use async await

  return (
    <div className="d-flex flex-column min-vh-100 text-center content-items-center">
      <Navbar setIsLoggedIn={setIsLoggedIn} />
      <section
        className={
          isDetail
            ? "content-container detailsContainerGrid"
            : isLoggedIn
            ? "content-container"
            : "content-container-noUser"
        }
      >
        <div className="row">
          {nouvelles.map(nouvelle => (
            <div key={nouvelle.postId} className="col-md-4">
              <ProjetCard
                title={nouvelle.postName}
                description={nouvelle.postContent}
                date={nouvelle.postDate}
                isLoggedIn={isLoggedIn}
                setIsDetail={setIsDetail}
                cardId={nouvelle.postId}
              />
            </div>
          ))}
        </div>
      </section>
      <Logo />
      <Footer />
    </div>
  );
}

export default NouvellesPage;
