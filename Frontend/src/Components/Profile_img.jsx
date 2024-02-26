import React from "react";
import profileImage from "../Img/profile_img.png";
import "../Styles/style.css";

const Profile_img = ({ user }) => {
  // Function to get initials from first and last names
  const getInitials = () => {
    if (user && user.firstName && user.lastName) {
      console.log("user: ", user);
      return user.firstName[0] + user.lastName[0];
    }
    return "";
  };

  return (
    <div
      className="profile-img text-center position-center"
      style={{
        backgroundImage: `url(${profileImage})`,
      }}
    >
      <div>
        {/* Display initials in h1 tag */}
        <h1>{getInitials()}</h1>
      </div>
    </div>
  );
};

export default Profile_img;
