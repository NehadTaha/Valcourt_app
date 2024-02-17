import '../Styles/headerStyle.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStream } from '@fortawesome/free-solid-svg-icons'
function Navbar(){


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
                  <i className="fa fa-home nav-icon"></i>
                  <a href="">Event</a>
              </li>
              <li>
                  <i className="fa fa-home nav-icon"></i>
                  <a href="">Project</a>
              </li>
              <li>
                  <i className="fa fa-home nav-icon"></i>
                  <a href="">News</a>
              </li>
              <li>
                  <i className="fa fa-home nav-icon"></i>
                  <a href="">Main valcourt2030 website</a>
              </li>
              <i>ICON</i>
          </ul>
          
          </div>
  
          <a href="#" className="logo">VALCOURT2030</a>
        </div>
  
  
        <div className="middle">

        </div>
  
  
        <div className="end">
          <a href="#">connect</a>
        </div>
  
      </header>
    )
}

export default Navbar