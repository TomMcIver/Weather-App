import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AlertsPage = ({ apiKey }) => {
  const [alerts, setAlerts] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAlerts = async (query) => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${query}&days=2&alerts=yes`
      );
      setLocation(response.data.location);
      setAlerts(response.data.alerts?.alert || []);
    } catch {
      setError('Failed to fetch weather alerts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts('auto:ip');
  }, []);

  if (loading) return <div className="main-content"><div className="loading">Loading weather alerts...</div></div>;

  return (
    <div className="main-content">
      <h1>Weather Alerts</h1>
      
      {error && <div className="error-message">{error}</div>}

      {location && (
        <div className="location-info">
          <h2>{location.name}, {location.country}</h2>
        </div>
      )}

      {alerts.length > 0 ? (
        <div className="alerts-container">
          {alerts.map((alert, index) => (
            <div key={index} className="alert-box">
              <h3>{alert.event}</h3>
              <p>{alert.headline}</p>
              <p>{alert.desc}</p>
              <p><strong>Effective:</strong> {new Date(alert.effective).toLocaleString()}</p>
              <p><strong>Expires:</strong> {new Date(alert.expires).toLocaleString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-alerts">No active weather alerts.</div>
      )}
    </div>
  );
};

export default AlertsPage;
