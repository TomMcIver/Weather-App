import React, { useState, useEffect } from 'react';
import axios from 'axios';


const ForecastPage = ({ apiKey }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeather = async (query) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${query}&days=3&aqi=yes`
      );
      setWeather(response.data);
      setError(null);
    } catch {
      setError('Failed to fetch weather data.');
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
        () => {
          setError('Unable to access location.');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported.');
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  if (loading) return <div className="main-content"><div className="loading">Loading forecast data...</div></div>;
  if (error) return <div className="main-content"><div className="error-message">{error}</div></div>;

  return (
    <div className="main-content">
      <h1>3-Day Weather Forecast</h1>
      
      {weather && (
        <div className="forecast-container">
          {weather.forecast.forecastday.map((day) => (
            <div key={day.date} className="forecast-tile">
              <div className="date">
                {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </div>
              <img src={day.day.condition.icon} alt={day.day.condition.text} className="weather-icon" />
              <div className="temp-range">
                <span className="high">{Math.round(day.day.maxtemp_c)}°C</span>
                <span className="low">{Math.round(day.day.mintemp_c)}°C</span>
              </div>
              <div className="condition">{day.day.condition.text}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ForecastPage;
