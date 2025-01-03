import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ theme }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="nav-logo">
          WeatherApp
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-item">
          Current
        </Link>
        <Link to="/forecast" className="nav-item">
          Forecast
        </Link>
        <Link to="/alerts" className="nav-item">
          Alerts
        </Link>
        <Link to="/search" className="nav-item">
          Search
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;