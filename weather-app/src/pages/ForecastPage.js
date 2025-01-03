import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ForecastPage = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const API_KEY = '7f0a900c2f6b4ad1b7b220228250201';

  const fetchWeather = async (query) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${query}&days=7&aqi=yes`
      );
      setWeather(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          fetchWeather(`${lat},${lon}`);
        },
        (error) => {
          console.error('Error getting location:', error);
          setError('Unable to access location. Please check your browser settings.');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  if (loading) {
    return (
      <div className="app-container">
        <div className="loading">Loading forecast data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <div className="error-message">{error}</div>
        <button onClick={getLocation} className="location-button">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="app-container">
      <h1> Weather Forecast</h1>
      
      {weather && (
        <>
          <div className="current-weather">
            <h2>{weather.location.name}, {weather.location.country}</h2>
            <button onClick={getLocation} className="location-button">
              Update Location
            </button>
          </div>

          <div className="forecast">
            <div className="forecast-container">
              {weather.forecast.forecastday.map((day) => (
                <div key={day.date} className="forecast-day">
                  <div className="date">
                    {new Date(day.date).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                  <img 
                    src={day.day.condition.icon} 
                    alt={day.day.condition.text}
                    className="weather-icon" 
                  />
                  <div className="temp-range">
                    <span className="high">{Math.round(day.day.maxtemp_c)}°C</span>
                    <span className="low">{Math.round(day.day.mintemp_c)}°C</span>
                  </div>
                  <div className="condition">{day.day.condition.text}</div>
                  <div className="forecast-details">
                    <p>Chance of Rain: {day.day.daily_chance_of_rain}%</p>
                    <p>Humidity: {day.day.avghumidity}%</p>
                    <p>Wind: {day.day.maxwind_kph} km/h</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ForecastPage;