import profileImage from "../Img/profile_img.png";
//Import style.css file
import "../Styles/style.css";

const Profile_img = () => {
  return (
    <div
      className="profile-img-small"
      style={{
        backgroundImage: `url(${profileImage})`,
      }}
    >
        <h1 className="smallTxt">NT</h1>
    </div>
  );
};
export default Profile_img;
