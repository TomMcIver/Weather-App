import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';

import Navbar from './components/Navbar';
import ForecastPage from './pages/ForecastPage';
import AlertsPage from './pages/AlertsPage';
import SearchPage from './pages/SearchPage';



const CurrentWeather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [autoLocation, setAutoLocation] = useState(false);
  
  const API_KEY = '7f0a900c2f6b4ad1b7b220228250201';


  const fetchWeather = async (query) => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${query}`
      );
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
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
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to access location. Please check your browser settings.');
          setAutoLocation(false);
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
      setAutoLocation(false);
    }
  };


  useEffect(() => {
    getLocation();
  }, []);

 
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="app-container">
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
        <div className="weather-details">
          <h2>{weather.location.name}, {weather.location.country}</h2>
          <p>Temperature: {weather.current.temp_c}°C</p>
          <p>Condition: {weather.current.condition.text}</p>
          <img
            src={weather.current.condition.icon}
            alt="weather icon"
            className="weather-icon"
          />
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
      <div>
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<CurrentWeather />} />
          <Route path="/forecast" element={<ForecastPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/search" element={<SearchPage />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;