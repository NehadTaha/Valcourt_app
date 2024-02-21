import '../Styles/headerStyle.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStream, faHouse, faBriefcase, faCalendarDays,faNewspaper,faGlobe } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import ProfileImgSmall from '../Components/ProfileImgSmall'
function Navbar({props}){
    return(
        <header>
        <div className="start">
          <div>
            <input type="checkbox" id="check" />
            <label for="check" className="checkbtn">
                <FontAwesomeIcon icon={faStream} />
            </label>
            <ul>
              <li>
                <FontAwesomeIcon icon={faCalendarDays} />
                  <a href="">Event</a>
              </li>
              <li>
                <FontAwesomeIcon icon={faBriefcase} />
                  <a href="">Project</a>
              </li>
              <li>
              <FontAwesomeIcon icon={faNewspaper} />
                  <a href="">News</a>
              </li>
              <li>
              <FontAwesomeIcon icon={faHouse} />
                  <a href="">Main valcourt2030 website</a>
              </li>
              <i className='main-logo'></i>
          </ul>
          
          </div>
          <a href="#" className="main-logo"></a>
        </div>
  
  
        <div className="middle">

        </div>
  
  
        <div className="end">
        {props.isLoggedIn ? <ProfileImgSmall /> : <a href="#">connect</a>}
        </div>
  
      </header>
    )
}

export default Navbar