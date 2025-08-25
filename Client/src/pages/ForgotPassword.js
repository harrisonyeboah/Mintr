import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // 👈 include cookies
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Password reset link has been sent to your email.');
      } else {
        setMessage(data.error || 'Something went wrong.');
      }
    } catch (err) {
      setMessage('Server error. Please try again later.');
    }

    setEmail(''); // clear email input
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo">
          <h1 className="logoName">Mintr</h1>
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

        {message && <p className="status-message">{message}</p>}

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
