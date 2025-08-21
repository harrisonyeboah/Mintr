import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css'; // Reuse the same CSS

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement password reset logic when backend is ready
    console.log('Password reset requested for:', email);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo">
          <h1 className='logoName'>Mintr</h1>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <h2>Forgot Password</h2>
          <p className="subtitle">Enter your email to reset your password</p>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <button type="submit" className="login-button">
            Reset Password
          </button>
        </form>

        <div className="signup-link">
          <p>
            Remembered your password?{' '}
            <Link to="/login" className="link">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
