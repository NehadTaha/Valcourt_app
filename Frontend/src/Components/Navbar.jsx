// Importing CSS styles for the header
import "../Styles/headerStyle.css";

// Importing necessary icons from FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStream,
  faHouse,
  faBriefcase,
  faCalendarDays,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";

//import react essentials
import { useState, useEffect } from "react";
import ProfileImgSmall from "../Components/ProfileImgSmall";
import { useNavigate } from "react-router-dom";

// Navbar component
function Navbar({ setIsLoggedIn }) {
  const [logTest, setLogTest] = useState(false);// To track user login status

  const [vUser, setVUser] = useState();// To store user info

  const [isMenuOpen, setIsMenuopen] = useState(false);// To track whether the menu is open

  // Fetching user info from the backend when component mounts
  useEffect(() => {
    let token = "";
    // Function to get user token from local storage
    function getUser() {
      if (localStorage.getItem("token")) {
        token = localStorage.getItem("token");
      }
    }
    // Function to fetch user info from the backend
    const fetchUserInfo = async () => {
      const userInfoUrl = "http://localhost:8080/userInfo/profile";
      const options = {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",// Setting Authorization header with token
        },
      };

      try {
        const response = await fetch(userInfoUrl, options);// Fetching user info

        const data = await response.json();// Parsing response JSON

        if (response.ok) {
          setVUser(data); // Set user info state
          setLogTest(true);// Setting login status to true
          setIsLoggedIn(true); // Setting parent component's login status
        } else {
          //console.error("Error fetching user info:", data.message);
          setVUser(false); // Setting user info state to false
          setLogTest(false);// Setting login status to false
        }
      } catch (error) {
        //console.error("Error fetching user info:", error);
        setVUser(false);// Setting user info state to false
        setLogTest(false); // Setting login status to false
      }
    };
    getUser();
    fetchUserInfo();
  }, []);

  // Function to close the menu by unckeking checkbox
  function closeMenu() {
    document.getElementById("check").checked = false;
  }
  // Function to toggle the menu open/close
  function menuFlop() {
    if (!isMenuOpen) {
      setIsMenuopen(true);// Opening the menu
      document.getElementById("check").click();// Simulating click on the checkbox
    } else {
      setIsMenuopen(false);// Closing the menu
      document.getElementById("check").click();// Simulating click on the checkbox
    }
  }
    // Function to handle menu open/close
  function onMenuOpen() {
    menuFlop();// Toggling the menu
    if (isMenuOpen) {
      document.body.style.overflow = "unset";// Allowing body overflow when menu is closed, masking the page scrollable
    } else {
      document.body.style.overflow = "hidden";// Hiding body overflow when menu is open, making the page unscrollable
    }
  }

  const navigate = useNavigate();

  // JSX markup for the navbar
  return (
    <header className="no-select">
      {console.log("logtest", logTest)}
      <div className="start">
        <div>
          <input type="checkbox" id="check" onClick={onMenuOpen} />
          <label htmlFor="check" className="checkbtn">
            <FontAwesomeIcon icon={faStream} />
          </label>
          <ul className="navDrawer">
            <li>
              <FontAwesomeIcon icon={faCalendarDays} />
              <a
                href="/"
                onClick={() => {
                  closeMenu();
                  navigate("/");
                }}
              >
                Évenements
              </a>
            </li>
            <li>
              <FontAwesomeIcon icon={faBriefcase} />
              <a
                href="/projets"
                onClick={() => {
                  closeMenu();
                  navigate("/projets");
                }}
              >
                Projets
              </a>
            </li>
            <li>
              <FontAwesomeIcon icon={faNewspaper} />
              <a
                href="/nouvelles"
                onClick={() => {
                  closeMenu();
                  navigate("/nouvelles");
                }}
              >
                Nouvelles
              </a>
            </li>
            <li>
              <FontAwesomeIcon icon={faHouse} />
              <a
                href="/"
                onClick={() => {
                  closeMenu();
                  navigate("/");
                }}
              >
                Site Principale valcourt2030
              </a>
            </li>
            <i className="main-logo"></i>
          </ul>
        </div>
        <a href="#" className="main-logo"></a>
      </div>

      <div className="middle"></div>

      <div className="end">
        {logTest ? (
          <ProfileImgSmall user={vUser} />
        ) : (
          <a
            href="/login"
            onClick={() => {
              closeMenu();
              navigate("/login");
            }}
          >
            se connecter
          </a>
        )}
      </div>
    </header>
  );
}

export default Navbar;
