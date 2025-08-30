import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate(); // <-- hook for navigation

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(`Login failed: ${data.message}`);
        return;
      }

      console.log("Login successful:", data);
      setFormData({ username: "", password: "" });

      // ✅ Navigate to dashboard after successful login
      navigate("/dashboard");
    } catch (err) {
      console.error("Error logging in:", err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="logoName">Mintr</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Welcome Back</h2>
          <p className="subtitle">Sign in to your account</p>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-options">
            <label className="checkbox-container">
              <input type="checkbox" />
              <span className="checkmark"></span>
              Remember me
            </label>
            <Link to="/forgot-password" className="forgot-password">
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>

        <div className="signup-link">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="link">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
