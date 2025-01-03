import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AlertTriangle, Info, CheckCircle } from 'lucide-react';

const AlertsPage = () => {
  const [alerts, setAlerts] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const API_KEY = '7f0a900c2f6b4ad1b7b220228250201';

  const fetchAlerts = async (query) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${query}&days=2&alerts=yes`
      );
      setLocation(response.data.location);
      setAlerts(response.data.alerts?.alert || []);
      setError(null);
    } catch (error) {
      console.error('Error fetching weather alerts:', error);
      setError('Failed to fetch weather alerts. Please try again.');
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
          fetchAlerts(`${lat},${lon}`);
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

  const getAlertIcon = (severity) => {
    severity = severity?.toLowerCase() || '';
    if (severity.includes('severe') || severity.includes('extreme')) {
      return <AlertTriangle className="text-red-500" size={24} />;
    } else if (severity.includes('moderate')) {
      return <Info className="text-yellow-500" size={24} />;
    }
    return <Info className="text-blue-500" size={24} />;
  };

  const getAlertClass = (severity) => {
    severity = severity?.toLowerCase() || '';
    if (severity.includes('severe') || severity.includes('extreme')) {
      return 'alert-severe';
    } else if (severity.includes('moderate')) {
      return 'alert-moderate';
    }
    return 'alert-minor';
  };

  if (loading) {
    return (
      <div className="app-container">
        <div className="loading">Loading weather alerts...</div>
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
      <h1>Weather Alerts</h1>
      
      {location && (
        <div className="location-info">
          <h2>{location.name}, {location.country}</h2>
          <button onClick={getLocation} className="location-button">
            Update Location
          </button>
        </div>
      )}

      <div className="alerts-container">
        {alerts && alerts.length > 0 ? (
          alerts.map((alert, index) => (
            <div 
              key={index} 
              className={`alert-item ${getAlertClass(alert.severity)}`}
            >
              <div className="alert-header">
                {getAlertIcon(alert.severity)}
                <h3>{alert.event}</h3>
              </div>
              <div className="alert-content">
                <p className="alert-headline">{alert.headline}</p>
                <p className="alert-description">{alert.desc}</p>
                <div className="alert-meta">
                  {alert.effective && (
                    <p>Effective: {new Date(alert.effective).toLocaleString()}</p>
                  )}
                  {alert.expires && (
                    <p>Expires: {new Date(alert.expires).toLocaleString()}</p>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-alerts">
            <CheckCircle size={48} className="text-green-500" />
            <p>No active weather alerts for your location.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsPage;