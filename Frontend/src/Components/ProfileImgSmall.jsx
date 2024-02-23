import profileImage from "../Img/profile_img.png";
//Import style.css file
import "../Styles/style.css";
import { useNavigate } from 'react-router-dom'

const Profile_img = () => {
  const navigate = useNavigate()

  return (
    <div
      className="profile-img-small"
      style={{
        backgroundImage: `url(${profileImage})`,
      }}
      onClick={()=>navigate("/profile")}
    >
        <h1 className="smallTxt">NT</h1>
    </div>
  );
};
export default Profile_img;
