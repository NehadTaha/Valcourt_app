import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Card from "../Components/Card";
import "../Styles/EventBody.css";

import { useEffect, useState } from "react";
import Dropdown from "../Components/Dropdown";

function EventPage() {
  const topicList = [
    "Arts",
    "Cuisine",
    "Concertation et partenariats",
    "Développement local",
    "Éducation",
    "Environnement",
    "Entrepreunariat",
    "Formation",
    "Implication citoyenne",
    "Interculturel",
    "Intergénérationnel",
    "Musique",
    "Rencontre sociale",
    "Sports et plein air",
  ];

  const [selectedTags, setSelectedTags] = useState(topicList);
  const [isUser, setIsUser] = useState();

  useEffect(() => {
    let token = localStorage.getItem("token");
    const fetchUserInfo = async () => {
      const userInfoUrl = "http://localhost:8080/userInfo/profile";
      const options = {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      };

      const hideIfNoUser = document.getElementById("content-tag");

      try {
        const response = await fetch(userInfoUrl, options);
        const data = await response.json();

        if (response.ok) {
          setSelectedTags(data.topics);
          setIsUser(data._id.toString());
          if (hideIfNoUser != null) {
            hideIfNoUser.classList.remove("hide-dis");
            hideIfNoUser.classList.add("dis");
          }
        } else {
          console.error("Error fetching user info:", data.message);
          if (hideIfNoUser != null) {
            hideIfNoUser.classList.remove("dis");
            hideIfNoUser.classList.add("hide-dis");
          }
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        setIsUser("");
        if (hideIfNoUser != null) {
          hideIfNoUser.classList.remove("dis");
          hideIfNoUser.classList.add("hide-dis");
        }
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <>
      <Navbar
        props={{
          isLoggedIn: false,
        }}
      />
      <section class="content-container">
        
        <Dropdown
          selectedTags={selectedTags}
          isUser={isUser}
          setSelectedTags={setSelectedTags}
        />

        <div class="content-card">
          <Card
            prop={{
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.",
              title: "This is Some Title",
              date: "16/02/2024",
            }}
          />
          <Card
            prop={{
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.",
              title: "This is Some Title",
              date: "31/10/2024",
            }}
          />
        </div>
      </section>
      <Footer />
    </>
  );
}

export default EventPage;
