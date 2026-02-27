import React, { useState } from "react";
import "../styles/auth.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterUser = () => {
  const navigate = useNavigate();
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/user/register",
        {
          fullName: fullName,
          email: email,
          password: password,
        },
      );
      console.log(res.data);
      navigate("/login-user");
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="logo" />
          <div>
            <h2 className="h1">Create account</h2>
            <div className="desc">Join as a user</div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="form">
          <div>
            <label className="label">Full name</label>
            <input
              className="input"
              type="text"
              placeholder="John Doe"
              onChange={(e) => {
                setfullName(e.target.value);
              }}
            />
          </div>
          <div>
            <label className="label">Email</label>
            <input
              className="input"
              type="email"
              placeholder="you@example.com"
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
              placeholder="Create a password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="actions">
            <button className="btn" type="submit">
              Create account
            </button>
          </div>
          <Link to="/login-user" className="small-link">
            Already have an account? Sign in
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterUser;
