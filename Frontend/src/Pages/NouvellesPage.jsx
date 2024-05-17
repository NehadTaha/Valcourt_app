import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import "../Styles/style.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Footer from "../Components/Footer";
import NouvellesCard from "../Components/nouvellesCard";
import NouvellesCardDetail from "../Components/NouvellesCardDetail";

function NouvellesPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDetail, setIsDetail] = useState(false);
  const [nouvelles, setNouvelles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [plainTextContent, setPlainTextContent] = useState([]);
  const [newsId, setNewsId] = useState("");
  //const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [isLoggedIn]);
  const fetchData = async () => {
    try {
      const url = `http://localhost:8080/posts/nouvelles`;

      const response = await fetch('url,{method: "GET"}');
      if (!response.ok) {
        throw new Error("Failed to fetch nouvelles");
      }
      const data = await response.json();
      setNouvelles(data);
      setPlainTextContent(
        data.map((nouvelle) => nouvelle.postContent.replace(/<[^>]+>/g, ""))
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
            ? "content-card detailsContent-Card"
            : isLoggedIn
            ? "content-card"
            : "content-card noUser-justify"
        }
        style={{ paddingTop: "80px" }}
      >
        {isDetail ? (
          <NouvellesCardDetail
            nouvelles={nouvelles} // Assuming you want to display details for the first event
            newsID={newsId} // Assuming eventId is a property of event object
            setIsDetail={setIsDetail}
          />
        ) : nouvelles != [] ? (
          nouvelles.map((nouvelle, index) => {
            return (
              <NouvellesCard
                key={nouvelle.newsId} // Ensure each component has a unique key
                title={nouvelle.newsTitle}
                imageUrl={
                  nouvelle.newsContent.match(/<img[^>]+src="([^">]+)"/)?.[1] ||
                  ""
                }
                description={plainTextContent[index]}
                date={nouvelle.newsDate}
                setIsDetail={setIsDetail}
                cardId={nouvelle.newsId}
              ></NouvellesCard>
            );
          })
        ) : (
          <h2>Aucun nouvelles pour le moment !</h2>
        )}
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
}

export default NouvellesPage;
