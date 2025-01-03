# Weather App

A modern weather application built with React that provides current weather conditions, forecasts, alerts, and detailed weather information.

## Features

- Current weather conditions
- 3-day forecast
- Weather alerts
- Detailed weather information including:
  - Temperature and "feels like" temperature
  - Wind speed and direction
  - Humidity and pressure
  - Air quality data
  - Sun and moon information
- Location-based weather data
- Search functionality for any location
- Dark/Light theme toggle
- Responsive design for all devices

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 14.0 or higher)
- npm (comes with Node.js)
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/weather-app.git
```

2. Navigate to the project directory:
```bash
cd weather-app
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm start
```

5. Open your browser and visit:
```
http://localhost:3000
```

## API Key Setup (REQUIRED)

The app uses the WeatherAPI.com API. The API key shown in the code (`7f0a900c2f6b4ad1b7b220228250201`) has been deactivated and will not work. You must replace it with your own API key.

1. Create your own free API key at [WeatherAPI.com](https://www.weatherapi.com/)

2. Replace the deactivated API key in the following files:
   - `src/App.js`
   - `src/pages/AlertsPage.js`
   - `src/pages/DetailedWeatherPage.js`
   - `src/pages/ForecastPage.js`
   - `src/pages/SearchPage.js`

   Look for this line in each file:
   ```javascript
   const API_KEY = '7f0a900c2f6b4ad1b7b220228250201';
   ```
   Replace it with:
   ```javascript
   const API_KEY = 'your-api-key-here';
   ```

⚠️ IMPORTANT: The app will not work without replacing the API key in all these files.

For production environments, you should:
1. Store the API key in environment variables
2. Never commit API keys to version control
3. Use backend proxy to secure your API key

## Required Dependencies

The app uses several key dependencies:
- react-router-dom (for routing)
- axios (for API requests)
- lucide-react (for icons)
- recharts (for weather data visualization)

These will all be installed when you run `npm install`.

## Usage

The app will request permission to access your location. If granted, it will automatically show the weather for your current location. You can also:

- Search for any location using the search bar
- View detailed weather information by clicking on the "Details" tab
- Check weather alerts in your area
- Toggle between dark and light themes
- View a 7-day forecast
- Check hourly weather predictions

## License

This project is licensed under the MIT License - see the LICENSE.md file for details

## Troubleshooting

If you encounter any issues:

1. Make sure all dependencies are installed correctly:
```bash
npm install
```

2. Clear your npm cache:
```bash
npm cache clean --force
```

3. If you get module not found errors, try:
```bash
npm install recharts lucide-react
```

4. For API-related issues, check if:
   - Your internet connection is working
   - The API key is valid
   - You haven't exceeded the API rate limits
