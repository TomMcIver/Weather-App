import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [autoLocation, setAutoLocation] = useState(false); 

  const API_KEY = '7f0a900c2f6b4ad1b7b220228250201';

  // fetch weather
  const fetchWeather = async (query) => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${query}`
      );
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      alert('Failed to fetch weather data.');
    }
  };

  const handleSearch = () => {
    if (city) {
      fetchWeather(city);
    }
  };

  // detect location
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
          alert('Unable to access location. Enter city manually.');
        }
      );
    } else {
      alert('Geolocation not supported by your browser.');
    }
  };

  useEffect(() => {
    getLocation(); 
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Weather App</h1>
      {!autoLocation && (
        <>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
          />
          <button onClick={handleSearch}>Get Weather</button>
        </>
      )}
      <button onClick={getLocation}>Use My Location</button>

      {weather && (
        <div>
          <h2>{weather.location.name}, {weather.location.country}</h2>
          <p>Temperature: {weather.current.temp_c}°C</p>
          <p>Condition: {weather.current.condition.text}</p>
          <img src={weather.current.condition.icon} alt="weather icon" />
        </div>
      )}
    </div>
  );
}

export default App;
