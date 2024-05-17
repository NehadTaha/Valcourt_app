import { useState } from "react";
import "../Styles/EventBody.css";
import {useNavigate} from 'react-router-dom'
import AdminToast from "./AdminToast";


const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="confirm-main">
      <div >
        <p>{message}</p>
        <div >
          <button onClick={onConfirm}>Confirmer</button>
          <button onClick={onCancel}>Annuler</button>
        </div>
      </div>
    </div>
  );
};


const AdminCard = ({
  title,
  description,
  date,
  setIsDetail,
  cardId,
  setEventId,
  isAdmin
}) => {

    const [form,setForm] = useState([])
    const [isDisable,setIsDisable] = useState(true)
    const [showModal,setShowModal] = useState(false)

    const [command, setCommand] = useState(false);

    function handleInputChange(key, newValue) {
        form[key] = newValue;
        setForm(form);
        //console.log(form)
        if("message" in form & "object" in form & "name" in form){
          setIsDisable(false)
        }

        if(form["message"] == "" || form["object"] == "" || form["name"] == ""){
          setIsDisable(true)
        }
        
        //console.log(isDisable)
      }

  const months = {
    "01": "Janvier",
    "02": "Février",
    "03": "Mars",
    "04": "Avril",
    "05": "Mai",
    "06": "Juin",
    "07": "Juillet",
    "08": "Août",
    "09": "Septembre",
    "10": "Octobre",
    "11": "Novembre",
    "12": "Décembre",
  };

  //set default values before page gets hydrated
  let day = "01";
  let month = "January";
  let year = "2024";
  let desc = "";

  //separate date string to asign to variables
  const setDate = () => {
    const token = date.split("-");
    const dayConversion = token[2].split(" ");
    //console.log(dayConversion);
    day = dayConversion[0];
    for (const key in months) {
      if (key === token[1]) {
        month = months[key];
      }
    }
    year = token[0];
    //console.log(token);
  };

  //take the first sentence from the event content
  const setDesc = () => {
    const token = description.split(".");
    desc = token[0];
  };

  //set date and content on page load
  setDate();
  setDesc();
 const handleSend = ()=>{
    //put mass email route here
    //use cardId to know what user are participating
    //also add some sort of comfirmation on send?
    //add something to indicate a send (smallToast)
    //disable button when form is empty
    setShowModal(true)

    
    document.getElementById("email-form").reset()
    

 }

 const handleConfirm = async ()=>{
  if(isAdmin){
    const message = form['message'] + `<br><br>- ${form['name']}`

    //console.log(message)

    const url = 'http://localhost:8080/email/adminEventMail'

    const body = {
      eventId:cardId,
      subject:form['object'],
      message:message,
    }

    let token = localStorage.getItem("token");
    const option = {
      method:"POST",
      headers:{
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(body)
    }


    const response = await fetch(url,option)

    const toastDiv = document.getElementById("load-prevent")
    toastDiv.classList.remove("load-prevent")
    console.log(response)
    setShowModal(false)
    setCommand(true)
    setForm([])
  }
 
  setIsDisable(true)
}
const handleCancel = ()=>{
  setShowModal(false)
  console.log("canceled")
}

  //component content
  return (
    <>
    <div className="load-prevent" id="load-prevent">
    <AdminToast command={command} setCommand={setCommand}></AdminToast>
    </div>
    
    
    <div className="customCard">
      <p className="title" >
        {title}
      </p>
      <p className="content" >
        {desc + "..."}
      </p>
      <div className="admin-example-date" >
        <span className="day">{day}</span>
        <span className="month">{month}</span>
        <span className="year">{year}</span>
      </div>
      <div className="admin-form">
        <h1>Envoyer un email aux participants</h1>
        <form className="admin-main" id="email-form">
            <div className="admin-grouping">
                <label htmlFor="senderName" className="admin-input">
                    <i></i> Votre nom
                </label>
                <input className="content-text-font" name="senderName" type="text" onChange={(e)=>{
                    handleInputChange("name",e.target.value)
                }} placeholder="e.g. john doe"/>
            </div>
            <div className="admin-grouping">
                <label htmlFor="object" className="admin-input">
                    <i></i> Sujet
                </label>
                <input className="content-text-font" name="object" type="text" onChange={(e)=>{
                    handleInputChange("object",e.target.value)
                }} placeholder="upcomming event..."/>
            </div>
            <div className="admin-grouping">
                <label htmlFor="message" className="admin-input">
                    <i></i> Message
                </label>
                <textarea className="content-text-font" name="message" onChange={(e)=>{
                    handleInputChange("message",e.target.value)
                }} cols="40" rows="10"></textarea>
            </div>
            {isDisable?<div className="admin-button-disabled" >Send Mail</div>:<div className="admin-button" onClick={handleSend}>Send Mail</div>}
            
        </form>
        {showModal?
            <ConfirmationModal
            message="Are you sure?"
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            />
            :<></>}
            
      </div>
    </div>
    </>
  );
};

export default AdminCard;
