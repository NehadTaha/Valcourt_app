import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Card from "../Components/Card";
import "../Styles/font.css";
import "../Styles/EventBody.css";
import Dropdown from "../Components/Dropdown";
import { useState } from "react";
import CardDetail from "../Components/CardDetail";

function EventPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDetail, setIsDetail] = useState(false)

  return (
    <>
      <Navbar setIsLoggedIn={setIsLoggedIn} />
      {console.log("logged: ", isLoggedIn)}
      <section class={isDetail?"content-container detailsContainerGrid":"content-container"}>

        {isDetail? <div></div>:<Dropdown />}
        

        <div class={isDetail?"content-card detailsContent-Card":"content-card"}>
          {
            isDetail? <CardDetail title={"title"} time={"time"} description={"description"} date={"date"} imageUrl={'https://valcourt2030.org/wp-content/uploads/2024/01/mhn-2024-1024x577.png'} location={"address"} phone={"999-999-9999"} setIsDetail={setIsDetail}></CardDetail>:<Card
            prop={{
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.",
              title: "This is Some Title",
              date: "16/02/2024",
            }}
            isLoggedIn={isLoggedIn}
            setIsDetail={setIsDetail}
          />
          }
          
        </div>

        
      </section>
      <Footer />
    </>
  );
}

export default EventPage;
