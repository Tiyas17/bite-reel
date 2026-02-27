import React, { useState } from "react";
import "../styles/auth.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPartner = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/food-partner/login",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        },
      );
      console.log(res.data);
      navigate("/createfood");
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="role-switch">
          <Link to="/login-user" className="role-btn">
            User
          </Link>
          <Link to="/login-partner" className="role-btn active">
            Food Partner
          </Link>
        </div>
        <div className="auth-header">
          <div className="logo" />
          <div>
            <h2 className="h1">Login</h2>
            <div className="desc">For the Food-partner</div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="form">
          <div>
            <label className="label">Business Email</label>
            <input
              className="input"
              type="email"
              placeholder="starbucks@business.com"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <label className="label">Password</label>
            <input
              className="input"
              type="password"
              placeholder="••••••••"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="actions">
            <button className="btn" type="submit">
              Sign in
            </button>
          </div>
          <Link to="/register-partner" className="small-link">
            Don't have an account? Register
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginPartner;
