import { faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import SmallToast from "./SmallToast";

const SignUpDropdown = (props) => { 
  //for more information refer to DropDownComponent
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

  const [selectedTags, setSelectedTags] = useState([]);
  const [command,setCommand]=useState(false)

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
    const t = e.target.id.toString();
    removeOneTopic(t);
  };

  const handleDropDownClick = (e) => {
    const t = e.target.id.toString();
    addOneTopic(t);
  };

  function filldropDown(listOfTags) {
    let notUsed = topicList;
    if (listOfTags != undefined && notUsed != listOfTags) {
        if(listOfTags.length >= topicList.length){
            return <p className="cDText content-text-font">Toutes les catégories actuellement sélectionnées</p>;
        }
      for (let i = 0; i < listOfTags.length; i++) {
        notUsed = removeItemOnce(notUsed, listOfTags[i]);
      }

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

      return dropDownTags;
    } else {
      return <p className="cDText content-text-font">Toutes les catégories actuellement sélectionnées</p>;
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
        <p className="noSpace content-text-font" id={tag} onClick={handleTagClick}>
          {tag}
        </p>
        <FontAwesomeIcon icon={faXmark} className="x-icon" />
      </div>
    ));

    return tags;
  }

  const removeOneTopic = (topicToRemove) => {
    const updatedArray = selectedTags.filter(tag => tag !== topicToRemove);
    setSelectedTags(updatedArray);
  };

  const addOneTopic = (topicToAdd) => {
    setSelectedTags(prevTags => [...prevTags, topicToAdd]);

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
            <div onClick={props.onSave('topics', selectedTags)} className="customDropdown">{filldropDown(selectedTags)}</div>
          </div>
          <SmallToast command={command} setCommand={setCommand}></SmallToast>
        </div>
      </div>
    </div>
  );
};
export default SignUpDropdown;
