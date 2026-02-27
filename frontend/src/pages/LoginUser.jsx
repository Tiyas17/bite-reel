import React, { useState } from "react";
import "../styles/auth.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginUser = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/user/login",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        },
      );
      console.log(res.data);
      navigate("/home");
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="role-switch">
          <Link to="/login-user" className="role-btn active">
            User
          </Link>
          <Link to="/login-partner" className="role-btn">
            Food Partner
          </Link>
        </div>
        <div className="auth-header">
          <div className="logo" />
          <div>
            <h1 className="h1">Login</h1>
            <div className="desc">For the Users</div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="form">
          <div>
            <label className="label">Email</label>
            <input
              className="input"
              type="email"
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="label">Password</label>
            <input
              className="input"
              type="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="actions">
            <button className="btn" type="submit">
              Sign in
            </button>
          </div>
          <Link to="/register-user" className="small-link">
            Don't have an account? Register
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginUser;
