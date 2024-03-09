import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../Components/Logo";
import updateUserInformation from "../Middleware/UpdatingDB";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if new password matches confirm password
    if (newPassword !== confirmPassword) {
      setAlertVariant("danger");
      setAlertMessage("Passwords do not match");
      setShowAlert(true);
      return;
    }

    try {
      const password = newPassword;
      // Call API to update password
      const responseData = await updateUserInformation({
        password: password,
      });
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

  return (
    <div className="container min-vh-100 ">
      <Logo />

      <h1>Changer le mot de passe</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Couriel</Form.Label>
          <Form.Control type="email" placeholder="Entrer votre couriel" />
        </Form.Group>
        <Form.Group controlId="formBasicNewPassword">
          <Form.Label>Nouveau mot de passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Nouveau mot de passe"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicConfirmPassword">
          <Form.Label>Confirmer votre mot de passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirmer votre mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Button className="btn m-2 " variant="primary" type="submit">
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
      <Alert variant="primary">
        <Link to="/login">Connectez-vous</Link> à votre compte
      </Alert>
    </div>
  );
};

export default ChangePassword;
