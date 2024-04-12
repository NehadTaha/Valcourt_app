import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Profile from "./Pages/Profile";
import EventPage from "./Pages/EventPage";
import LoginPage from "./Pages/LoginPage";
import SignUp from "./Pages/SignUpPage";
import ChangePassword from "./Pages/ChangePassword";
import VerifyPage from "./Pages/VerifyPage";
import EventDetails from "./Components/EventDetails";
import ForgottenPasswordPage from "./Pages/ForgottenPasswordPage";
import ResetPasswordPage from "./Pages/ResetPasswordPage";
import Projets from "./Pages/Projets";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<EventPage />}></Route>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
        <Route
          path="/event-details"
          element={<EventDetails></EventDetails>}
        ></Route>

        <Route
          path="/change-password"
          element={<ChangePassword></ChangePassword>}
        ></Route>
        <Route path="/verify/:uniqueString" element={<VerifyPage />} />
        <Route path="/reset" element={<ForgottenPasswordPage />} />
        <Route path="/reset/:token" element={<ResetPasswordPage />} />
        <Route path="/projets" element={<Projets />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
