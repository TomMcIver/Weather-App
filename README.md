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
git clone https://github.com/TomMcIver/weather-app.git
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

The app uses the WeatherAPI.com API. The API key shown in the code (`825e7c38637d4ebaa1823829250301`) has been deactivated and will not work. You must replace it with your own API key.

1. Create your own free API key at [WeatherAPI.com](https://www.weatherapi.com/)

2. Replace the deactivated API key in the following files:
   - `src/App.js`


   Look for this line:
   ```javascript
   const API_KEY = '825e7c38637d4ebaa1823829250301';
   ```
   Replace it with:
   ```javascript
   const API_KEY = 'your-api-key-here';
   ```

⚠️ IMPORTANT: The app will not work without replacing the API key .

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


## Images of app

![1](https://github.com/user-attachments/assets/1338676f-1d69-438f-9483-ec3a0e22f045)

![2](https://github.com/user-attachments/assets/f68085a1-fede-4d86-9d65-b5e4f896d2f3)

![3](https://github.com/user-attachments/assets/307c1cca-eeff-47f7-b48b-b8480be38c5f)

![4](https://github.com/user-attachments/assets/1545e6ea-15e8-449c-83b4-427fe7202733)

![5](https://github.com/user-attachments/assets/bb3d85ed-c292-44cc-8190-3e5a4cd5b6d6)

![6](https://github.com/user-attachments/assets/0121af56-a341-4d65-a484-96428f505b50)

![7](https://github.com/user-attachments/assets/655be71a-9e6d-4db2-9013-be79bad76c1c)

![8](https://github.com/user-attachments/assets/af4ec14b-7983-4f88-b3d2-e7d506e9bce0)

















