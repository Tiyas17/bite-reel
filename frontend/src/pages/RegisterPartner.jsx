import React, { useState } from "react";
import axios from "axios";
import "../styles/auth.css";
import { Link, useNavigate } from "react-router-dom";

const RegisterPartner = () => {
  const navigate = useNavigate();
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/food-partner/register",
        {
          name: fullName,
          email: email,
          password: password,
        },
      );
      console.log(res.data);
      navigate("/login-partner");
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
            <h2 className="h1">Registration</h2>
            <div className="desc">Create your partner account</div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="form">
          <div>
            <label className="label">Business name</label>
            <input
              className="input"
              type="text"
              placeholder="Cafe ABC"
              onChange={(e) => {
                setfullName(e.target.value);
              }}
            />
          </div>
          <div>
            <label className="label">Business email</label>
            <input
              className="input"
              type="email"
              placeholder="partner@business.com"
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
          <Link to="/login-partner" className="small-link">
            Already registered? Sign in
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterPartner;
