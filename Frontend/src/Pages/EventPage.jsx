import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Card from "../Components/Card";
import "../Styles/EventBody.css";
import { useEffect, useState } from "react";

function EventPage() {

  const [stateLoggedIn,setStateIsLoggedIn]= useState(false)

  useEffect(()=>{
    
    function ifLoggedIn(){
      if(localStorage.getItem('token')){
        setStateIsLoggedIn(true)
      }
    }

    ifLoggedIn()

  })

  return (
    <>
      <Navbar props={{
        isLoggedIn:stateLoggedIn
      }}/>
      <section class="content-container">
        <div class="content-tag">
          <div class="tags">
            <div>
              <label for="">Arts</label>
              <input type="checkbox" name="" id="" />
            </div>
            <div>
              <label for="">Cuisine</label>
              <input type="checkbox" name="" id="" />
            </div>
            <div>
              <label for="">Concertation et partenariats</label>
              <input type="checkbox" name="" id="" />
            </div>
            <div>
              <label for="">Développement local</label>
              <input type="checkbox" name="" id="" />
            </div>
            <div>
              <label for="">Éducation</label>
              <input type="checkbox" name="" id="" />
            </div>
            <div>
              <label for="">Environnement</label>
              <input type="checkbox" name="" id="" />
            </div>
            <div>
              <label for="">Entrepreneuriat</label>
              <input type="checkbox" name="" id="" />
            </div>
            <div>
              <label for="">Formation</label>
              <input type="checkbox" name="" id="" />
            </div>
            <div>
              <label for="">Implication citoyenne</label>
              <input type="checkbox" name="" id="" />
            </div>
            <div>
              <label for="">Interculturel</label>
              <input type="checkbox" name="" id="" />
            </div>
            <div>
              <label for="">Intergénérationnel</label>
              <input type="checkbox" name="" id="" />
            </div>
            <div>
              <label for="">Musique</label>
              <input type="checkbox" name="" id="" />
            </div>
            <div>
              <label for="">Rencontre sociale</label>
              <input type="checkbox" name="" id="" />
            </div>
            <div>
              <label for="">Sports et plein air</label>
              <input type="checkbox" name="" id="" />
            </div>
            <button>Save</button>
            <button>Clear Selection</button>
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
