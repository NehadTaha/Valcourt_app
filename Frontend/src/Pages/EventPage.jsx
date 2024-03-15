import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Card from "../Components/Card";
import "../Styles/EventBody.css";
import { faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

function EventPage() {
  const topicList =  ["Arts", "Cuisine", "Concertation et partenariats", "Développement local",
   "Éducation", "Environnement", "Entrepreunariat", "Formation", "Implication citoyenne",
    "Interculturel", "Intergénérationnel", "Musique",
   "Rencontre sociale", "Sports et plein air"]
  const [selectedTags, setSelectedTags] = useState(topicList);
  const [isUser, setIUser] = useState('')

  const removeOneTopic = async (topicToRemove, userId) =>{
    const removeTopicUrl = `http://localhost:8080/userInfo/topics/remove/${userId}/${topicToRemove}`
    try{
      const response = await fetch(
        removeTopicUrl,{
          method: "POST",
          credentials: "same-origin",
          headers: {"Content-Type":"application/json",},
          body: JSON.stringify({"Hello":"world"}),
        }
        )

        const data = await response.json()
      setSelectedTags(data.message)
    }catch(e){
      console.log(e)
    }
  }

  const addOneTopic = async (topicToRemove, userId) =>{
    const removeTopicUrl = `http://localhost:8080/userInfo/topics/add/${userId}/${topicToRemove}`
    try{
      const response = await fetch(
        removeTopicUrl,{
          method: "POST",
          credentials: "same-origin",
          headers: {"Content-Type":"application/json",},
          body: JSON.stringify({"Hello":"world"}),
        }
        )

        const data = await response.json()
      setSelectedTags(data.message)
    }catch(e){
      console.log(e)
    }
  }

  const handleTagClick = (e) =>{
    if(isUser !== ""){
      const t = e.target.id.toString()
      removeOneTopic(t,isUser)
    }
  }

  const handleDropDownClick = (e)=>{
    if(isUser !== ""){
      const t = e.target.id.toString()
      addOneTopic(t,isUser)
    }
  }


  useEffect(() => {
    let token = localStorage.getItem("token");
    const fetchUserInfo = async () => {
      const userInfoUrl = "http://localhost:8080/userInfo/profile";
      const options = {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      };

      const hideIfNoUser = document.getElementById("content-tag")

      try {
        const response = await fetch(userInfoUrl, options);
        const data = await response.json();
        

        if (response.ok) {
          setSelectedTags(data.topics);
          setIUser(data._id.toString())
          hideIfNoUser.classList.remove('hide-dis')
          hideIfNoUser.classList.add('dis')
        } else {
          console.error("Error fetching user info:", data.message);
          hideIfNoUser.classList.remove('dis')
          hideIfNoUser.classList.add('hide-dis')
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        setIUser("")
        hideIfNoUser.classList.remove('dis')
        hideIfNoUser.classList.add('hide-dis')
      }
    };

    fetchUserInfo();
  }, []);

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
        <p className="noSpace" id={tag} onClick={handleTagClick} >{tag}</p>
        <FontAwesomeIcon icon={faXmark} className="x-icon" />
      </div>
    ));

    return tags;
  }

  function filldropDown(listOfTags){
    let notUsed = topicList;
    if(listOfTags!=undefined && notUsed !== listOfTags){
      for(let i =0; i<listOfTags.length; i++){
        notUsed = removeItemOnce(notUsed, listOfTags[i])
      }
      
      console.log("not used", notUsed)
      const dropDownTags = notUsed.map((tag,index)=>(
        <p className="cDText" key={index} id={tag} onClick={handleDropDownClick}>{tag}</p>
      ))
  
      return(
        dropDownTags
      )

    }else{
      return(<p className="cDText">All tags Currently Selected</p>)
    }
   
  }

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

  return (
    <>
      <Navbar
        props={{
          isLoggedIn: false,
        }}
      />
      <section class="content-container">
        <div class="content-tag dis">
          <div id="content-tag" class="dis">
          <p class="tags-title"> Select Your Interests </p>
          <div class="tags">
            <div class="cluster">
              {selectedTags != undefined && fillTags(selectedTags)}
            </div>
            <div class="tag-node clickable" onClick={addTagsMenuToggle}>
              <p className="noSpace">Add new interest</p>
              <FontAwesomeIcon icon={faPlus} className="x-icon" />
            </div>
            <div className="addTags-menu-hide" id="addTagsMenu">
              <div className="customDropdown">
                {filldropDown(selectedTags)}
              </div>
            </div>
            <div>
              <button>Save</button>
            </div>
          </div>
          </div>
          
        </div>

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
