import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    dateOfBirth: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // <-- hook for navigation

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else {
      const today = new Date();
      const birthDate = new Date(formData.dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) age--;
      if (age < 18) newErrors.dateOfBirth = 'You must be at least 18 years old';
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\+?[1-9]\d{0,15}$/.test(formData.phoneNumber.replace(/[\s\-()]/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        const result = await response.json();
        console.log('Server response:', result);

        if (response.ok) {
          alert("You are registered");
          setFormData({
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            dateOfBirth: '',
            phoneNumber: '',
            password: '',
            confirmPassword: ''
          });

          // ✅ Navigate to dashboard after successful registration
          navigate("/dashboard");
        } else {
          alert("Registration failed: " + (result.message || "Unknown error"));
        }
      } catch (err) {
        console.error('Error posting to API:', err);
      }
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h1 className="logoName">Mintr</h1>
        <h2>Create Account</h2>
        <p className="subtitle">Join Mintr today</p>

        {/* form fields omitted for brevity (keep your existing JSX) */}

        <div className="form-options">
          <label className="checkbox-container">
            <input type="checkbox" required />
            I agree to the <Link to="/terms" className="link">Terms of Service</Link> and <Link to="/privacy" className="link">Privacy Policy</Link>
          </label>
        </div>

        <button type="submit" className="register-button">Create Account</button>

        <div className="signin-link">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="link">Sign in</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
