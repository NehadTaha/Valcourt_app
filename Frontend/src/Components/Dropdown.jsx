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
  //set tags currently in db for user
  const [selectedTags, setSelectedTags] = useState(topicList);
  //set if a user is connected
  const [isUser, setIsUser] = useState();
  //used for smallToast as a toggle
  const [command, setCommand] = useState(false);


  //get user info from db with token
  useEffect(() => {
    let token = localStorage.getItem("token");
    const fetchUserInfo = async () => {
      const userInfoUrl = "http://localhost:8080/userInfo/profile";
      const options = {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      };
      //get element to hide if no user
      const hideIfNoUser = document.getElementById("content-tag");

      try {
        const response = await fetch(userInfoUrl, options);
        const data = await response.json();

        if (response.ok) {
          //user found
          setSelectedTags(data.topics);
          setIsUser(data._id.toString());
          //if the element exist (should always be true) then show element 
          if (hideIfNoUser != null) {
            hideIfNoUser.classList.remove("hide-dis");
            hideIfNoUser.classList.add("dis");
          }
        } else {
          //user not found, hide element
          console.error("Error fetching user info:", data.message);
          if (hideIfNoUser != null) {
            hideIfNoUser.classList.remove("dis");
            hideIfNoUser.classList.add("hide-dis");
          }
        }
      } catch (error) {
        //server error, hide element
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
    //hide or show the tags drawer on toggle, if hidden then show...
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

  //remove tags from array on click
  const handleTagClick = (e) => {
    if (isUser !== "") {
      const t = e.target.id.toString();
      removeOneTopic(t);
      console.log(selectedTags);
    }
  };

  //add tags in array on click
  const handleDropDownClick = (e) => {
    if (isUser !== "") {
      const t = e.target.id.toString();
      addOneTopic(t);
      console.log(selectedTags);
    }
  };

  function filldropDown(listOfTags) {
    let notUsed = topicList;
    //if the list of tags of user form db is not undefiend and does not equal all tags
    if (listOfTags != undefined && notUsed != listOfTags) {
      //if listoftags is greater or equal in length then all tags display message and end operation
      if (listOfTags.length >= topicList.length) {
        return <p className="cDText content-text-font">Toutes les catégories actuellement sélectionnées</p>;
      }
      //else remove tags already selected form full tag list, and save the rest
      for (let i = 0; i < listOfTags.length; i++) {
        notUsed = removeItemOnce(notUsed, listOfTags[i]);
      }

      //create list of tag component with list od unused tags
      const dropDownTags = notUsed.map((tag, index) => (
        <p
          className="cDText content-text-font"
          key={index}
          id={tag}
          onClick={handleDropDownClick}
        >
          {tag}
        </p>
      ));
      //display unused tags
      return dropDownTags;
    } else {
      return <p className="cDText content-text-font">Toutes les catégories actuellement sélectionnées</p>;
    }
  }

  //remove a specific item from array using value of item
  function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }
  //fill the used tags space
  function fillTags(listOfTags) {
    const tags = listOfTags.map((tag, index) => (
      <div key={index} className="tag-node">
        <p className="noSpace content-text-font" id={tag} onClick={handleTagClick}>
          {tag}
        </p>
        <FontAwesomeIcon icon={faXmark} className="x-icon" />
      </div>
    ));

    return tags;
  }
  //update list of tags (not only one..)
  const removeOneTopic = (topicToRemove) => {
    const updatedArray = selectedTags.filter((tag) => tag !== topicToRemove);
    setSelectedTags(updatedArray);
  };

  const addOneTopic = (topicToAdd) => {
    setSelectedTags((prevTags) => [...prevTags, topicToAdd]);
  };

  //update user tags in db on button click
  const saveTopicList = async () => {
    const modifyTopiURL = `http://localhost:8080/userInfo/topics/update/${isUser}`;

    try {
      const response = await fetch(modifyTopiURL, {
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
    <div className="content-tag dis" id="content-tag">
      <div  className="dis">
        <p className="tags-title"> Sélectionnez vos intérêts </p>
        <div className="tags">
          <div className="cluster">
            {selectedTags != null && fillTags(selectedTags)}
          </div>
          <div className="tag-node clickable" onClick={addTagsMenuToggle}>
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
