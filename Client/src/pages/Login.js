import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
    /* This is the funtion that basically holds the login function and the state on key down and submits it as javascript object */
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement login logic when backend is ready
    console.log('Login attempt:', formData);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo">
          <h1 className='logoName'>Mintr</h1>
        </div>
        
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
            <Link to="/forgot-password" className="forgot-password"> Forgot password? </Link>

          </div>
          
          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>
        
        <div className="signup-link">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="link">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

