import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';

import Navbar from './components/Navbar';
import ForecastPage from './pages/ForecastPage';
import AlertsPage from './pages/AlertsPage';
import SearchPage from './pages/SearchPage';

const API_KEY = '825e7c38637d4ebaa1823829250301';

const CurrentWeather = ({ apiKey }) => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [autoLocation, setAutoLocation] = useState(false);

  const fetchWeather = async (query) => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${query}&days=1&aqi=yes`
      );
      setWeather(response.data);
    } catch (error) {
      alert('Failed to fetch weather data. Please try again.');
    }
  };

  const handleSearch = () => {
    if (city.trim()) {
      fetchWeather(city);
    } else {
      alert('Please enter a city name');
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          fetchWeather(`${lat},${lon}`);
          setAutoLocation(true);
        },
        () => {
          alert('Unable to access location.');
          setAutoLocation(false);
        }
      );
    } else {
      alert('Geolocation is not supported.');
      setAutoLocation(false);
    }
  };

  useEffect(() => {
    if (!autoLocation) {
      getLocation();
    }
  }, [autoLocation]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="main-content">
      <h1>Current Weather</h1>
      <div className="search-container">
        {!autoLocation && (
          <>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter city name"
              className="search-input"
            />
            <button onClick={handleSearch} className="search-button">
              Get Weather
            </button>
          </>
        )}
        <button onClick={getLocation} className="location-button">
          {autoLocation ? 'Update Location' : 'Use My Location'}
        </button>
      </div>

      {weather && (
        <div className="weather-card">
          <h2>{weather.location.name}, {weather.location.country}</h2>
          <div className="weather-info">
            <img src={weather.current.condition.icon} alt="Weather icon" className="weather-icon" />
            <div className="temperature">{weather.current.temp_c}°C</div>
            <div className="condition">{weather.current.condition.text}</div>
          </div>

          <div className="weather-details">
            <p><strong>Feels Like:</strong> {weather.current.feelslike_c}°C</p>
            <p><strong>Humidity:</strong> {weather.current.humidity}%</p>
            <p><strong>Wind Speed:</strong> {weather.current.wind_kph} km/h</p>
            <p><strong>Wind Direction:</strong> {weather.current.wind_dir}</p>
            <p><strong>Pressure:</strong> {weather.current.pressure_mb} mb</p>
            <p><strong>UV Index:</strong> {weather.current.uv}</p>
            <p><strong>Sunrise:</strong> {weather.forecast.forecastday[0].astro.sunrise}</p>
            <p><strong>Sunset:</strong> {weather.forecast.forecastday[0].astro.sunset}</p>
          </div>
        </div>
      )}
    </div>
  );
};

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <Router>
      <div className={`app-container ${theme}`}>
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<CurrentWeather apiKey={API_KEY} />} />
          <Route path="/forecast" element={<ForecastPage apiKey={API_KEY} />} />
          <Route path="/alerts" element={<AlertsPage apiKey={API_KEY} />} />
          <Route path="/search" element={<SearchPage apiKey={API_KEY} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
