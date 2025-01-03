import React, { useState } from 'react';
import axios from 'axios';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = '7f0a900c2f6b4ad1b7b220228250201';

  
  const fetchSuggestions = async (query) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${query}`
      );
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setError('Failed to fetch location suggestions');
    }
  };

  
  const fetchWeatherData = async (location) => {
    setLoading(true);
    setError(null);
    try {
      const [current, forecast, alerts] = await Promise.all([
        
        axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`),
        
        axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=3&aqi=yes`),
        
        axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&alerts=yes`)
      ]);

      setWeatherData({
        current: current.data,
        forecast: forecast.data,
        alerts: alerts.data.alerts
      });
      setSuggestions([]); 
      setSearchQuery(''); 
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchSuggestions(query);
  };

  
  const handleSuggestionClick = (location) => {
    fetchWeatherData(`${location.lat},${location.lon}`);
  };

  return (
    <div className="app-container">
      <h1>Search Weather</h1>
      
      
      <div className="search-section">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for a location..."
          className="search-input"
        />
        
        
        {suggestions.length > 0 && (
          <div className="suggestions-container">
            {suggestions.map((location) => (
              <div
                key={`${location.lat}-${location.lon}`}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(location)}
              >
                <span>{location.name}</span>
                <span className="location-detail">
                  {location.region && `${location.region}, `}{location.country}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      
      {error && <div className="error-message">{error}</div>}

      
      {loading && <div className="loading">Loading weather data...</div>}

      
      {weatherData && !loading && (
        <div className="weather-results">
          
          <div className="current-weather">
            <h2>{weatherData.current.location.name}, {weatherData.current.location.country}</h2>
            <div className="weather-info">
              <img 
                src={weatherData.current.current.condition.icon} 
                alt="Weather icon"
                className="weather-icon"
              />
              <div className="temperature">
                {weatherData.current.current.temp_c}°C
              </div>
              <div className="condition">
                {weatherData.current.current.condition.text}
              </div>
            </div>
          </div>

          
          <div className="forecast">
            <h3>3-Day Forecast</h3>
            <div className="forecast-container">
              {weatherData.forecast.forecast.forecastday.map((day) => (
                <div key={day.date} className="forecast-day">
                  <div className="date">
                    {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </div>
                  <img src={day.day.condition.icon} alt="Weather icon" />
                  <div className="temp-range">
                    <span className="high">{day.day.maxtemp_c}°C</span>
                    <span className="low">{day.day.mintemp_c}°C</span>
                  </div>
                  <div className="condition">{day.day.condition.text}</div>
                </div>
              ))}
            </div>
          </div>

          
          {weatherData.alerts?.alert?.length > 0 && (
            <div className="weather-alerts">
              <h3>Weather Alerts</h3>
              {weatherData.alerts.alert.map((alert, index) => (
                <div key={index} className="alert-item">
                  <h4>{alert.headline}</h4>
                  <p>{alert.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;