//Import Logo from valcourt-app/src/Components/Logo.jsx
import Navbar from "../Components/Navbar";
import "../Styles/style.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Footer from "../Components/Footer";
import { useState, useEffect } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);

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
        <div className="container-flex p-5 bg-gradient bg-light flex-grow-1">
          <div className="row p-3">
            <div className="col-12">
              <i className="bi bi-suit-heart-fill fs-1 mx-2"></i>
              <button
                className="btn fs-1 mb-2 rounded-pill"
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
                  <ul>
                    {user &&
                      user.topics &&
                      user.topics.map((topic, index) => (
                        <li key={index}>{topic}</li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="row p-3">
            <div className="col-12">
              <i className="bi bi-pencil-square fs-1 mx-2"></i>
              <button
                className="btn btn-white fs-1 mb-2 rounded-pill"
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
              <i className="bi bi-box-arrow-right fs-1 mx-2"></i>
              <button className="btn fs-1 mb-2 rounded-pill">
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
