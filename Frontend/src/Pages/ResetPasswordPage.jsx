import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Logo from "../Components/Logo";
import bcrypt from "bcryptjs";
import updateUserInformation from "../Middleware/UpdatingDB";
import validatePassword from "../Middleware/validatePassword";

const ResetPasswordPage = () => {
  const {token} = useParams()
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");
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
  const handleSubmit = async (e) => {
    e.preventDefault();

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
      }, token);
      console.log("data: ", responseData);

      // Display success message
      setAlertVariant("success");
      setAlertMessage("Password changed successfully");
      setShowAlert(true);

      // Reset form fields
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error updating password:", error);
      // Display error message
      setAlertVariant("danger");
      setAlertMessage("Error updating password");
      setShowAlert(true);
    }
  };
  // Function to hash password

  return (
    <div className="container min-vh-100 ">
      <div className="row">
        
        <Logo />

        <h1
          style={{
            color: "#164d8e",
          }}
        >
          Changer le mot de passe
        </h1>
        <Form onSubmit={handleSubmit}>
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

export default ResetPasswordPage;
