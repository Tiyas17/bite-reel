import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import LoginUser from "./pages/LoginUser";
import RegisterUser from "./pages/RegisterUser";
import LoginPartner from "./pages/LoginPartner";
import RegisterPartner from "./pages/RegisterPartner";
import "./styles/auth.css";
import Home from "./pages/Home";
import CreateFood from "./pages/CreateFood";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column", width: "100vw" }}
    >
      <Routes>
        <Route
          path="/"
          element={
            <Link to="/login-user" className="welcome-link">
              <h1 className="welcome-text">Welcome</h1>
            </Link>
          }
        />
        <Route path="/home" element={<Home />} />
        <Route path="/createfood" element={<CreateFood />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login-user" element={<LoginUser />} />
        <Route path="/register-user" element={<RegisterUser />} />
        <Route path="/login-partner" element={<LoginPartner />} />
        <Route path="/register-partner" element={<RegisterPartner />} />
      </Routes>
    </div>
  );
};

export default App;
