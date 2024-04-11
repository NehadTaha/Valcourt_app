import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../Components/Logo";
import bcrypt from "bcryptjs";
import updateUserInformation from "../Middleware/UpdatingDB";
import validatePassword from "../Middleware/validatePassword";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");

  useEffect(() => {
    // Clear form fields upon component mounting
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  }, []);

  const hashPassword = async (password) => {
    try {
      // Call backend or use bcrypt to hash the password
      // Example using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);
      return hashedPassword;
    } catch (error) {
      throw error;
    }
  };

  const handleOnClickReturn = () => {
    window.location.href = "/profile";
  };

  //Fet the old password from the database
  const getOldPassword = async () => {
    try {
      //fetch the user information
      const fetchUserdata = await fetch(
        "http://localhost:8080/userInfo/profile",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const responseData = await fetchUserdata.json();
      // Get the password from the response
      const password = responseData.password;
      console.log("password: ", password);
      return password;
    } catch (error) {
      throw error;
    }
  };

  const checkOldPassword = async (oldPassword) => {
    try {
      // Get the old password from the database
      const password = await getOldPassword();
      // Compare the old password with the password from the database
      const isMatch = await bcrypt.compare(oldPassword, password);
      return isMatch;
    } catch (error) {
      throw error;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    //Check if old password is empty
    if (oldPassword === "") {
      setAlertVariant("danger");
      setAlertMessage("L'ancien mot de passe est requis");
      setShowAlert(true);
      return;
    }
    //check if the old password is correct
    const isMatch = await checkOldPassword(oldPassword);
    if (!isMatch) {
      setAlertVariant("danger");
      setAlertMessage("Ancien mot de passe incorrect");
      setShowAlert(true);
      return;
    }

    //check if new password is empty
    if (newPassword === "") {
      setAlertVariant("danger");
      setAlertMessage("Le nouveau mot de passe est requis");
      setShowAlert(true);
      return;
    }
    //check if confirm password is empty
    if (confirmPassword === "") {
      setAlertVariant("danger");
      setAlertMessage("Confirmez votre mot de passe");
      setShowAlert(true);
      return;
    }

    // Check if new password matches confirm password
    if (newPassword !== confirmPassword) {
      setAlertVariant("danger");
      setAlertMessage("Passwords do not match");
      setShowAlert(true);
      return;
    }
    // If the password does not pass the test, end the procedure.
    if (!validatePassword(newPassword)) {
      setAlertVariant("danger");
      setAlertMessage(
        "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial (#$%?&*)."
      );
      setShowAlert(true);
      return;
    }

    try {
      const password = newPassword;
      // Hash the password
      const hashedPassword = await hashPassword(password);
      // Call API to update password
      const responseData = await updateUserInformation({
        password: hashedPassword,
      });
      console.log("data: ", responseData);

      // Display success message
      setAlertVariant("success");
      setAlertMessage("Le mot de passe a été changé avec succès");
      setShowAlert(true);
    } catch (error) {
      console.error("Error updating password:", error);
      // Display error message
      setAlertVariant("danger");
      setAlertMessage("Error updating password");
      setShowAlert(true);
    }
  };

  return (
    <div className="container min-vh-100 ">
      <div className="row">
        <div className="col-12">
          <button
            className="btn btn-primary mt-5"
            onClick={handleOnClickReturn}
          >
            Retour
          </button>
        </div>
        <Logo />

        <h1
          style={{
            color: "#164d8e",
          }}
        >
          Changer le mot de passe
        </h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="pt-3 ">Couriel</Form.Label>
            <Form.Control type="email" placeholder="Entrez votre couriel" />
          </Form.Group>
          <Form.Group controlId="formBasicOldPassword">
            <Form.Label className="pt-3">Ancien mot de passe</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ancien mot de passe"
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicNewPassword">
            <Form.Label className="pt-3">Nouveau mot de passe</Form.Label>
            <Form.Control
              type="password"
              placeholder="Nouveau mot de passe"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicConfirmPassword">
            <Form.Label className="pt-3">
              Confirmez votre mot de passe
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirmez votre mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Button className="btn m-2 mt-4 " variant="primary" type="submit">
            Changer le mot de passe
          </Button>
        </Form>
        <br />
        {showAlert && (
          <Alert
            variant={alertVariant}
            onClose={() => setShowAlert(false)}
            dismissible
          >
            {alertMessage}
          </Alert>
        )}
        <div className="d-fluid p-3">
          <Alert variant="primary ">
            <Link to="/login">Connectez-vous</Link> à votre compte
          </Alert>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
