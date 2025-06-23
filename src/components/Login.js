import React, { useState } from "react";
import logo from "../assets/logo.png";
import loginImg from "../assets/login.png";
import avatar from "../assets/avatar.png";

const ADMIN_EMAIL = "admin@deliverease.com";
const ADMIN_PASSWORD = "admin123";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem("isAdminLoggedIn", "true");
      window.location.href = "/";
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <img src={logo} alt="Deliverease Logo" className="login-logo" />
        <div className="login-illustration">
          <img src={loginImg} alt="Login Illustration" style={{ width: "300px", marginBottom: "2rem" }} />
          <h2 style={{ margin: 0 }}>DELIVEREASE</h2>
          <p style={{ marginTop: 0 }}>where every delivery finds its flow</p>
        </div>
      </div>
      <div className="login-right">
        <img src={avatar} alt="Admin Avatar" className="login-avatar" />
        <h3>Welcome back, Fey!</h3>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
        </form>
        <footer style={{ marginTop: "2rem", color: "#666", fontSize: "0.9rem" }}>Deliverease 2025</footer>
      </div>
    </div>
  );
};

export default Login; 