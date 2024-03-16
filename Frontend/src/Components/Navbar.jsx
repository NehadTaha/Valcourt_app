import "../Styles/headerStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStream,
  faHouse,
  faBriefcase,
  faCalendarDays,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
import { useState,useEffect } from "react";
import ProfileImgSmall from "../Components/ProfileImgSmall";
import { useNavigate } from "react-router-dom";
function Navbar({ isLoggedIn, user}) {

  const [logTest,setLogTest]= useState(isLoggedIn)

  const [vUser,setVUser] = useState(user)

  const [isMenuOpen,setIsMenuopen] = useState(false)

  

  useEffect(()=>{

    let token = ""
    
    function getUser(){ 
      if(localStorage.getItem("token")){
        token = localStorage.getItem('token')
      }
    }

    const fetchUserInfo = async () => {
      const userInfoUrl = "http://localhost:8080/userInfo/profile";
      const options = {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      };

      try {
        const response = await fetch(userInfoUrl, options);
        const data = await response.json();

        if (response.ok) {
          setVUser(data); // Set user info state
          setLogTest(true)
        } else {
          //console.error("Error fetching user info:", data.message);
          setVUser(false)
          setLogTest(false)
        }
      } catch (error) {
        //console.error("Error fetching user info:", error);
        setVUser(false)
        setLogTest(false)
      }
    };
    getUser()
    fetchUserInfo()
  },[])

  function closeMenu() {
    document.getElementById("check").checked = false;
  }

  function menuFlop(){
    if(!isMenuOpen){
      setIsMenuopen(true)
      document.getElementById("check").click()
    }
    else{
      setIsMenuopen(false)
      document.getElementById("check").click()
    }
  }

  function onMenuOpen(){
    menuFlop()
    if(isMenuOpen){
      document.body.style.overflow = 'unset';
    }else{
      document.body.style.overflow = 'hidden';
    }
  }

  const navigate = useNavigate();
  return (
    <header>
      <div className="start">
        <div>
          <input type="checkbox" id="check" onClick={onMenuOpen}/>
          <label for="check" className="checkbtn">
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
                Event
              </a>
            </li>
            <li>
              <FontAwesomeIcon icon={faBriefcase} />
              <a
                href="/"
                onClick={() => {
                  closeMenu();
                  navigate("/");
                }}
              >
                Project
              </a>
            </li>
            <li>
              <FontAwesomeIcon icon={faNewspaper} />
              <a
                href="/"
                onClick={() => {
                  closeMenu();
                  navigate("/");
                }}
              >
                News
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
                Main valcourt2030 website
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
            connect
          </a>
        )}
      </div>
    </header>
  );
}

export default Navbar;
