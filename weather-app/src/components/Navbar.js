import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';

const Navbar = ({ theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="nav-logo">
          WeatherApp
        </Link>
        <button className="hamburger-button" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className={`nav-links ${isOpen ? 'active' : ''}`}>
        <Link to="/" className="nav-item" onClick={closeMenu}>
          Current
        </Link>
        <Link to="/forecast" className="nav-item" onClick={closeMenu}>
          Forecast
        </Link>
        <Link to="/alerts" className="nav-item" onClick={closeMenu}>
          Alerts
        </Link>
        <Link to="/search" className="nav-item" onClick={closeMenu}>
          Search
        </Link>
        <button onClick={toggleTheme} className="theme-toggle-nav">
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;