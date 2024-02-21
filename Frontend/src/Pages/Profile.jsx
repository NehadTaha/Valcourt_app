//Import Logo from valcourt-app/src/Components/Logo.jsx
import Navbar from "../Components/Navbar";
import "../Styles/style.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Footer from "../Components/Footer";
const Profile = () => {
  return (
    <div>
      <div>
        <Navbar props={{
          isLoggedIn: true
        }}/>
      </div>  
      <div className="container-flex p-5 bg-gradient bg-light">
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
                  <li>Category1</li>
                  <li>Category2</li>
                  <li>Category3</li>
                  <li>Category4</li>
                  <li>Category5</li>
                  <li>Category6</li>
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
                    <label htmlFor="inputName" className="form-label">
                      Nom et prénom
                    </label>
                    <input
                      type="fullname"
                      className="form-control"
                      id="fullName"
                    ></input>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputEmail4" className="form-label">
                      Couriel
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmail4"
                    ></input>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputPassword4" className="form-label">
                      Mots de passe
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="inputPassword4"
                    ></input>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="inputCity" className="form-label">
                      Ville
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputCity"
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
      <Footer />
    </div>
  );
};
export default Profile;
