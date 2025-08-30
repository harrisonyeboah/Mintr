import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgetPassword from './pages/ForgotPassword';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import ResetPassword from './pages/ResetPassword';
import VerifiedPage from './pages/VerifiedPage';
import Dashboard from './pages/Dashboard';

import './styles/App.css';

/* This is the routes page with each possible route ranging from login to privacy */  

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Auth & misc pages */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgetPassword />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/verify" element={<VerifiedPage />} />

                    {/* Dashboard layout with nested pages */}
                    <Route path="/dashboard" element={<Dashboard />} />
    
                    {/* Default redirect */}
                    <Route path="/" element={<Navigate to="/login" replace />} />

                    {/* Catch-all redirect */}
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

