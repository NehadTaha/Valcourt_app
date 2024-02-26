import profileImage from "../Img/profile_img.png";
import { useNavigate } from "react-router-dom";

const ProfileImgSmall = ({ user }) => {
  const navigate = useNavigate();

  const getInitials = () => {
    if (user && user.firstName && user.lastName) {
      return user.firstName[0] + user.lastName[0];
    }
    return "";
  };

  return (
    <div
      className="profile-img-small"
      style={{
        backgroundImage: `url(${profileImage})`,
      }}
      onClick={() => navigate("/profile")}
    >
      <h1 className="smallTxt">{getInitials()}</h1>
    </div>
  );
};

export default ProfileImgSmall;
