import React, { useState } from 'react';
import axios from 'axios';

const SearchPage = ({ apiKey }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSuggestions = async (query) => {
    if (!query.trim() || query.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${query}`
      );
      
      // Always limit to exactly 3 suggestions
      const limitedSuggestions = response.data.slice(0, 3);
      setSuggestions(limitedSuggestions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchSuggestions(query);
  };

  const handleSuggestionClick = async (location) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location.name}`
      );
      setWeatherData(response.data);
      setSuggestions([]); // Clear suggestions after selection
      setSearchQuery(''); // Clear search input
    } catch (error) {
      setError('Failed to fetch weather data');
      console.error('Error fetching weather:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-content">
      <h1>Search Weather</h1>
      
      <div className="search-container">
        <div className="search-wrapper">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for a city..."
            className="search-input"
            autoComplete="off"
          />
          
          {suggestions.length > 0 && (
            <div className="suggestions-container">
              {suggestions.map((location) => (
                <div
                  key={`${location.lat}-${location.lon}`}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(location)}
                >
                  {location.name}
                  {location.region && `, ${location.region}`}
                  {location.country && `, ${location.country}`}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {loading && <div>Loading...</div>}
      {error && <div className="error-message">{error}</div>}
      
      {weatherData && !loading && (
        <div className="weather-card">
          <h2>{weatherData.location.name}, {weatherData.location.country}</h2>
          <div className="weather-info">
            <img 
              src={weatherData.current.condition.icon} 
              alt="Weather icon" 
              className="weather-icon"
            />
            <div className="temperature">{weatherData.current.temp_c}°C</div>
            <div className="condition">{weatherData.current.condition.text}</div>
          </div>
          
          <div className="weather-details">
            <p><strong>Feels Like:</strong> {weatherData.current.feelslike_c}°C</p>
            <p><strong>Humidity:</strong> {weatherData.current.humidity}%</p>
            <p><strong>Wind Speed:</strong> {weatherData.current.wind_kph} km/h</p>
            <p><strong>Wind Direction:</strong> {weatherData.current.wind_dir}</p>
            <p><strong>Pressure:</strong> {weatherData.current.pressure_mb} mb</p>
            <p><strong>UV Index:</strong> {weatherData.current.uv}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;