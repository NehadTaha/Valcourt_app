import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import "../Styles/style.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Footer from "../Components/Footer";
import NouvellesCard from "../Components/nouvellesCard";

function NouvellesPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDetail, setIsDetail] = useState(false);
  const [nouvelles, setNouvelles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  //const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/posts/nouvelles');
        if (!response.ok) {
          throw new Error('Failed to fetch nouvelles');
        }
        const data = await response.json();
        // Sort the data based on the post date, newest first
        data.sort((a, b) => new Date(b.postDate) - new Date(a.postDate));
        setNouvelles(data);
      } catch (error) {
        console.error('Error fetching nouvelles:', error);
      }
    };
  
    fetchData();
  }, []);

  // Calculate total number of pages
  const totalPages = Math.ceil(nouvelles.length / itemsPerPage);

  // Calculate index of the last item to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;

  // Calculate index of the first item to display on the current page
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Slice the nouvelles array to include only the items for the current page
  const displayedNouvelles = nouvelles.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="d-flex flex-column min-vh-100 text-center content-items-center">
      <Navbar setIsLoggedIn={setIsLoggedIn} className="col-12" />
      <section
        className={
          isDetail
            ? "content-container detailsContainerGrid"
            : isLoggedIn
            ? "content-container d-flex align-items-center justify-content-center"
            : "content-container-noUser d-flex align-items-center justify-content-center"
        }
        style={{ paddingTop: "80px" }}
      >
        <div className="row">
          <div className="col">
            {" "}
            {/* Adjust the column size and offset */}
            {displayedNouvelles.map((nouvelle) => (
              <NouvellesCard
                key={nouvelle.postId} // Ensure each component has a unique key
                title={nouvelle.postName}
                imageUrl={
                  nouvelle.postContent.match(
                    /<img[^>]+src="([^">]+)"/
                  )?.[1] || ""
                }
                description={nouvelle.postContent}
                date={nouvelle.postDate ? nouvelle.postDate.split("T")[0] : ""}
                isLoggedIn={isLoggedIn}
                setIsDetail={setIsDetail}
                cardId={nouvelle.postId} // Removed setNouvellesId
                isSubbed={null}
              />

            ))}
          </div>
        </div>
      </section>
      {/* Pagination */}
      {totalPages > 1 && (
        <nav>
          <ul className="pagination justify-content-center">
            {" "}
            {/* Added justify-content-center class */}
            {Array.from({ length: totalPages }).map((_, index) => (
              <li key={index} className="page-item">
                <button
                  onClick={() => paginate(index + 1)}
                  className="page-link"
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
      <Footer />
    </div>
  );
};

export default NouvellesPage;
