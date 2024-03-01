//Import Logo from valcourt-app/src/Components/Logo.jsx
import Navbar from "../Components/Navbar";
import "../Styles/style.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Footer from "../Components/Footer";
import Tags from "../Components/Tags";
import { useState, useEffect } from "react";

const Profile = ({ handleChange }) => {
  const [user, setUser] = useState(null);
  const [showTags, setShowTags] = useState(false);
  const [tags, setTags] = useState([]);
  const handleListEdit = () => {
    setShowTags(!showTags);
  };

  const handleChangeTags = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const userInfoUrl = "http://localhost:8080/userInfo/profile";
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ topics: data }), // Sending the updated tags array
      };
      fetch(userInfoUrl, options)
        .then((response) => response.json())
        .then((data) => {
          console.log("data: ", data);
        })
        .catch((error) => {
          console.error("Error updating user info:", error);
        });
      setTags(data);
      setShowTags(false);
      setUser((prevUser) => ({
        ...prevUser,
        topics: data,
      }));
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  };
  // Assuming that `data` contains the updated tags array directly

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token: ", token);

    const fetchUserInfo = async () => {
      const userInfoUrl = "http://localhost:8080/userInfo/profile";
      const options = {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      };

      try {
        const response = await fetch(userInfoUrl, options);
        const data = await response.json();
        console.log("data: ", data);

        if (response.ok) {
          setUser(data); // Set user info state
        } else {
          console.error("Error fetching user info:", data.message);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    if (token) {
      fetchUserInfo();
    }
  }, []);

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <div>
          <Navbar isLoggedIn={true} user={user} />
        </div>
        <div className="container-flex p-2 bg-gradient bg-light flex-grow-1">
          <div className="row p-3">
            <div className="col-12">
              <i className="bi bi-suit-heart-fill fs-4 mx-1"></i>
              <button
                className="btn fs-2 mb-2 rounded-pill"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#preferedList"
                aria-expanded="false"
                aria-controls="preferedList"
              >
                Ma liste préférée
              </button>
              <div className="collapse" id="preferedList">
                <div className="card card-body">
                  <div className="d-flex justify-content-end">
                    <span className="d-flex justify-content-right">
                      <i
                        className="bi bi-pencil-square fs-4 mx-1"
                        type="button"
                        onClick={handleListEdit}
                      ></i>{" "}
                    </span>
                  </div>
                  <ul>
                    {user &&
                      user.topics &&
                      user.topics.map((topic, index) => (
                        <li key={index}>{topic}</li>
                      ))}
                  </ul>
                </div>
                {showTags && (
                  <div className="card card-body">
                    <Tags handleChange={handleChangeTags} />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="row p-3">
            <div className="col-12">
              <i className="bi bi-pencil-square fs-4 mx-1"></i>
              <button
                className="btn btn-white fs-2 mb-2 rounded-pill"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#editProfile"
                aria-expanded="false"
                aria-controls="editProfile"
              >
                Modifier mon profil
              </button>
              <div className="collapse" id="editProfile">
                <div className="">
                  <form className="row g-3">
                    <div className="col-md-6">
                      <label
                        htmlFor="inputName"
                        className="form-label text-black"
                      >
                        Nom et prénom
                      </label>
                      <input
                        type="fullname"
                        className="form-control"
                        id="fullName"
                        value={user ? `${user.firstName} ${user.lastName}` : ""}
                      ></input>
                    </div>
                    <div className="col-md-6">
                      <label
                        htmlFor="inputEmail4"
                        className="form-label text-black"
                      >
                        Couriel
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="inputEmail4"
                        value={user ? user.email : ""}
                      ></input>
                    </div>
                    <div className="col-md-6">
                      <label
                        htmlFor="inputPassword4"
                        className="form-label text-black"
                      >
                        Mots de passe
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="inputPassword4"
                        value={user ? user.password : ""}
                      ></input>
                    </div>

                    <div className="col-md-6">
                      <label
                        htmlFor="inputCity"
                        className="form-label text-black"
                      >
                        Ville
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputCity"
                        value={user ? user.town : ""}
                      ></input>
                    </div>

                    <div className="col-12">
                      <button
                        type="submit"
                        className="btn btn-primary rounded-pill"
                      >
                        sauvegarder
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="row p-3">
            <div className="col-12">
              <i className="bi bi-box-arrow-right fs-4 mx-1"></i>
              <button className="btn fs-2 mb-2 rounded-pill">
                Se déconnecter
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
export default Profile;
