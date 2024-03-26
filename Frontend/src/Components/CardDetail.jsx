import CardDetailFooter from "./CardDetailFooter";
import '../Styles/details.css'
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const CardDetail = ({ title, date, time, description, imageUrl, location, phone, setIsDetail }) => {

  const [img,setImg] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch image from the internet
    fetch(imageUrl, {

    })
      .then(response => {
        // Check if response is OK
        if (!response.ok) {
          throw new Error('Failed to fetch image');
        }
        // Convert response to blob
        return response.blob();
      })
      .then(blob => {
        // Create object URL from blob
        const url = URL.createObjectURL(blob);
        setImg(url);
      })
      .catch(error => {
        console.error('Error fetching image:', error);
      });
  }, []); // Empty dependency array ensures this effect runs only once


  const handlePopState = (event)=>{
    if(event.state === null){
    }else{
      setIsDetail(false)
      window.removeEventListener('popstate',handlePopState)
      navigate('/')
    }
  }


  window.addEventListener('popstate',handlePopState)
  
  const handleBack = () =>{
    setIsDetail(false)
    navigate('/')
  }


  return (
    <>
      <div className="detailBlock">
        <p className="backButton" onClick={handleBack}>back</p>
        <h1>{title}</h1>
        <div className="datetime">
          <h3 style={{marginRight:"5px"}}>{date}</h3>
          <h3>{time}</h3>
        </div>
        <img className="imageContainer" id="imageContainer" src={img}>
        </img>
        <p className="pDesc">{description}</p>
        <CardDetailFooter location={location} phone={phone}></CardDetailFooter>
      </div>

    </>
  );
};


export default CardDetail