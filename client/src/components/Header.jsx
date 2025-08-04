import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="left-section" ref={menuRef}>
        <button
          className="hamburger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {menuOpen && (
          <nav className="dropdown-menu">
            <Link to="/" className="dropdown-item" onClick={() => setMenuOpen(false)}>Home</Link>
            <button className="dropdown-item" onClick={() => setMenuOpen(false)}>Shorts</button>
            <button className="dropdown-item" onClick={() => setMenuOpen(false)}>Subscriptions</button>
            <button className="dropdown-item" onClick={() => setMenuOpen(false)}>Library</button>
            <button className="dropdown-item" onClick={() => setMenuOpen(false)}>History</button>
          </nav>
        )}

        <Link to="/" className="logo-text">YouTube</Link>
      </div>

      <div className="center-section">
        <input
          type="text"
          placeholder="Search"
          className="search-input"
          // You can add search handlers here
        />
        <button className="search-button">🔍</button>
      </div>

      <div className="right-section">
        {user ? (
          <>
            <span className="username">{user.username}</span>
            <button className="signout-btn" onClick={handleLogout}>Sign Out</button>
          </>
        ) : (
          <Link to="/login" className="signin-link">Sign In</Link>
        )}
      </div>
    </header>
  );
}
