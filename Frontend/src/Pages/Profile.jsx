//Import Logo from valcourt-app/src/Components/Logo.jsx
import Navbar from "../Components/Navbar";
import "../Styles/style.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Footer from "../Components/Footer";
import Tags from "../Components/Tags";
import { useState, useEffect } from "react";
import updateUserInformation from "../Middleware/UpdatingDB";
import { municipalities } from "../constants";
import { Link } from "react-router-dom";
import DropdownProfile from "../Components/DropDownProfile.jsx";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [showTags, setShowTags] = useState(false);
  const [tags, setTags] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Inside the Profile component
  const [selectedCity, setSelectedCity] = useState(user ? user.town : "");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const handleChangeTags = async (data) => {
    try {
      const responseData = await updateUserInformation({ topics: data });
      console.log("data: ", responseData);
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

  const handleEditClick = () => {
    console.log("Edit button clicked");
    setEditMode(!editMode);
  };
  const saveFormChanges = async () => {
    try {
      const updatedUserInfo = {
        firstName: document.getElementById("fullName").value.split(" ")[0],
        lastName: document.getElementById("fullName").value.split(" ")[1],
        email: document.getElementById("inputEmail4").value,
        password: document.getElementById("inputPassword4").value,
        town: document.getElementById("inputCity").value,
      };

      const responseData = await updateUserInformation(updatedUserInfo);
      console.log("data: ", responseData);
      setUser(updatedUserInfo);
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  };
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
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
          <Navbar setIsLoggedIn={setIsLoggedIn} />
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
                <div className="container">
                  <div
                    className="card card-body "
                    style={{
                      boxShadow: "2px 2px 4px black",
                    }}
                  >
                    <div className="d-flex justify-content-end">
                      <span className="d-flex justify-content-right">
                        <i
                          className="bi bi-pencil-square fs-4 mx-1"
                          type="button"
                          onClick={handleEditClick}
                        ></i>{" "}
                      </span>
                    </div>

                    <DropdownProfile
                      editMode={editMode}
                      setEditMode={setEditMode}
                      onChangeTags={handleChangeTags}
                    />
                  </div>
                </div>
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
                <div className="container">
                  <div
                    className="card card-body "
                    style={{ boxShadow: "2px 2px 4px black" }}
                  >
                    <div className="">
                      <button
                        className="btn btn-primary"
                        onClick={handleEditClick}
                      >
                        Modifier
                      </button>
                      <form className="row g-3">
                        <div className="col-md-6">
                          <label
                            htmlFor="inputName"
                            className="form-label text-black"
                          >
                            Nom et prénom
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="fullName"
                            {...(editMode
                              ? { placeholder: user ? `Nom et prénom` : "" }
                              : {
                                  value: user
                                    ? `${user.firstName} ${user.lastName}`
                                    : "",
                                })}
                            readOnly={!editMode}
                          />
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
                          />
                        </div>
                        <div className="col-md-6">
                          <label
                            htmlFor="inputPassword4"
                            className="form-label text-black"
                          >
                            Mots de passe
                          </label>
                          <div className="input-group">
                            <input
                              type="password"
                              className="form-control"
                              id="inputPassword4"
                              value={user ? user.password : ""}
                              readOnly
                            />
                            {editMode ? (
                              <Link to="/change-password">
                                <button
                                  className="btn btn-outline-secondary"
                                  type="button"
                                >
                                  <i className="bi bi-pencil-fill"></i>
                                </button>
                              </Link>
                            ) : null}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <label
                            htmlFor="inputCity"
                            className="form-label text-black"
                          >
                            Municipalité
                          </label>
                          {editMode ? (
                            <select
                              className="form-select"
                              id="inputCity"
                              value={selectedCity}
                              onChange={handleCityChange}
                            >
                              <option value={user ? user.town : ""}>
                                {user ? user.town : ""}
                              </option>
                              {municipalities.map(
                                (city, index) =>
                                  user &&
                                  user.town !== city && (
                                    <option key={index} value={city}>
                                      {city}
                                    </option>
                                  )
                              )}
                            </select>
                          ) : (
                            <input
                              type="text"
                              className="form-control"
                              id="inputCity"
                              value={user ? user.town : ""}
                              readOnly={!editMode}
                            />
                          )}
                        </div>
                        {editMode && (
                          <div className="col-12">
                            <button
                              type="submit"
                              className="btn btn-primary rounded-pill p-3"
                              onClick={saveFormChanges}
                            >
                              sauvegarder
                            </button>
                          </div>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row p-3">
            <div className="col-12">
              <i className="bi bi-box-arrow-right fs-4 mx-1"></i>
              <button
                className="btn fs-2 mb-2 rounded-pill"
                onClick={handleLogout}
              >
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
