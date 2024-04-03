import { faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import SmallToast from "./SmallToast";

const Dropdown = ({ updateFilteredEvents }) => {
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
  const [command, setCommand] = useState(false);

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

  function addTagsMenuToggle() {
    if (
      document
        .getElementById("addTagsMenu")
        .classList.contains("addTags-menu-hide")
    ) {
      document
        .getElementById("addTagsMenu")
        .classList.remove("addTags-menu-hide");
    } else {
      document.getElementById("addTagsMenu").classList.add("addTags-menu-hide");
    }
  }

  const handleTagClick = (e) => {
    if (isUser !== "") {
      const t = e.target.id.toString();
      removeOneTopic(t);
      console.log(selectedTags);
    }
  };

  const handleDropDownClick = (e) => {
    if (isUser !== "") {
      const t = e.target.id.toString();
      addOneTopic(t);
      console.log(selectedTags);
    }
  };

  function filldropDown(listOfTags) {
    let notUsed = topicList;
    if (listOfTags != undefined && notUsed != listOfTags) {
      if (listOfTags.length >= topicList.length) {
        return <p className="cDText">All tags Currently Selected</p>;
      }
      for (let i = 0; i < listOfTags.length; i++) {
        notUsed = removeItemOnce(notUsed, listOfTags[i]);
      }

      const dropDownTags = notUsed.map((tag, index) => (
        <p
          className="cDText"
          key={index}
          id={tag}
          onClick={handleDropDownClick}
        >
          {tag}
        </p>
      ));

      return dropDownTags;
    } else {
      return <p className="cDText">All tags Currently Selected</p>;
    }
  }

  function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  function fillTags(listOfTags) {
    const tags = listOfTags.map((tag, index) => (
      <div key={index} class="tag-node">
        <p className="noSpace" id={tag} onClick={handleTagClick}>
          {tag}
        </p>
        <FontAwesomeIcon icon={faXmark} className="x-icon" />
      </div>
    ));

    return tags;
  }

  const removeOneTopic = (topicToRemove) => {
    const updatedArray = selectedTags.filter((tag) => tag !== topicToRemove);
    setSelectedTags(updatedArray);
  };

  const addOneTopic = (topicToAdd) => {
    setSelectedTags((prevTags) => [...prevTags, topicToAdd]);
  };

  const saveTopicList = async () => {
    const removeTopicUrl = `http://localhost:8080/userInfo/topics/update/${isUser}`;

    try {
      const response = await fetch(removeTopicUrl, {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topicList: selectedTags }),
      });
      setCommand(true);

      const data = await response.json();
      updateFilteredEvents();

      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div class="content-tag dis">
      <div id="content-tag" class="dis">
        <p class="tags-title"> Sélectionnez vos intérêts </p>
        <div class="tags">
          <div class="cluster">
            {selectedTags != null && fillTags(selectedTags)}
          </div>
          <div class="tag-node clickable" onClick={addTagsMenuToggle}>
            <p className="noSpace">Ajoutez un nouvel intérêt</p>
            <FontAwesomeIcon icon={faPlus} className="x-icon" />
          </div>
          <div className="addTags-menu-hide" id="addTagsMenu">
            <div className="customDropdown">{filldropDown(selectedTags)}</div>
          </div>
          <div>
            <button onClick={saveTopicList}>Sauvegarder</button>
          </div>
          <SmallToast command={command} setCommand={setCommand}></SmallToast>
        </div>
      </div>
    </div>
  );
};
export default Dropdown;
