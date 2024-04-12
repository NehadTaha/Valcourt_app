import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgottenPasswordPage() {

  // Holds the login information
  const [form, setForm] = useState({});

  function handleInputChange(key, newValue) {
    form[key] = newValue;
    setForm(form);
    console.log(form);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginUrl = "http://localhost:8080/auth/reset";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(form),
    };
    try {
      const response = await fetch(loginUrl, options);
      console.log("response.status: ", response.status);
      const data = await response.json();
      console.log("data: ", data);
      if (response.status === 200) {
        alert(data)
      } else {
        alert(data); // Show error message if login fails
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <div
      className="container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div className="row px-5">
        <div className="col">
          <div className="d-flex justify-content-center">
            <img
              width="250"
              height="100"
              src="./V2030 transparence.png"
              alt=""
            />
          </div>
          <div className="d-flex justify-content-center">
            <h1>Réinitialiser votre mot de passe</h1>
          </div>
          <br />
          <form onSubmit={handleSubmit}>
            <div className="row align-items-center mb-3">
              <label className="form-label col-4" htmlFor="email">
                Courriel:
              </label>
              <input
                className="col content-text-font"
                type="email"
                id="email"
                required
                onChange={(event) =>
                  handleInputChange("email", event.target.value)
                }
              />
            </div>
            
            <div className="col d-flex justify-content-center">
              <button className="btn btn-primary content-text-font" type="submit">
                Envoyer le courriel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgottenPasswordPage;
