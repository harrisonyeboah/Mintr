import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import './styles/App.css';
/* This is the routes page with each possible route ranging from login to privacy */  

function App() {
    return (
        <ThemeProvider>
            <Router>
                <div className="App">
                    <ThemeToggle />
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/" element={<Navigate to="/login" replace />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/privacy" element={<Privacy />} />
                    </Routes>
                </div>
            </Router>
        </ThemeProvider>
    );
}

export default App;
