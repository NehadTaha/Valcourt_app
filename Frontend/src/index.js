import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Profile from "./Pages/Profile";
import EventPage from "./Pages/EventPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/event" element={<EventPage />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
