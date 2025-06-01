import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/products');
    } catch (err) {
      setMessage('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // toggle dark mode class on <body>
  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  return (
    <div className={`login-container`}>
      <img src="/bg-blob.svg" alt="bg-shape" className="login-background-shape" />

      <header className="login-header-bar">
        <img src="/osu-logo.png" alt="OSU Logo" className="login-logo-icon" />
        <span className="login-header-title">OSU ERP Portal</span>
        <button className="dark-toggle-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </header>

      <div className="login-main-wrapper">
        <div className="login-info-blogs">
          <div className="login-blog-box">
            <h3 className="blog-title">📌 Why Centralized ERP Matters</h3>
            <p className="blog-text">
              A centralized ERP platform streamlines operations and empowers both admins and staff with real-time access.
            </p>
          </div>
          <div className="login-blog-box">
            <h3 className="blog-title">🔐 Secure Role-Based Access</h3>
            <p className="blog-text">
              Role-based access ensures that admins manage data while staff securely track tasks and inventory.
            </p>
          </div>
        </div>

        <div className="login-card">
          <div className="login-lock">🔐</div>
          <h2 className="login-card-title">Login to Continue</h2>
          <p className="login-card-subtitle">Admin & Staff Portal – Secure Access</p>

          <form onSubmit={handleLogin} className="login-form">
            <input
              type="email"
              placeholder="Email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {message && (
            <p className={`login-message ${message.toLowerCase().includes('invalid') ? 'error' : 'success'}`}>
              {message}
            </p>
          )}
        </div>
      </div>

      <footer className="login-footer">
        &copy; {new Date().getFullYear()} Oklahoma State University – ERP System. All rights reserved.
      </footer>
    </div>
  );
}

export default Login;
