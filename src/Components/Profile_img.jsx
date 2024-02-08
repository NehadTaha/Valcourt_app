import profileImage from "../Img/profile_img.png";
//Import style.css file
import "../Styles/style.css";

const Profile_img = () => {
  return (
    <div
      className="profile-img text-center position-center"
      style={{
        backgroundImage: `url(${profileImage})`,
      }}
    >
      <div>
        <h1>NT</h1>
      </div>
    </div>
  );
};
export default Profile_img;
