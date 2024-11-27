import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import './App.css';
import All_UI from './components/All_UI';

// Import icons
import clear_icon from './assets/clear.png';
import cloud_icon from './assets/cloud.png';
import drizzle_icon from './assets/drizzle.png';
import rain_icon from './assets/rain.png';
import snow_icon from './assets/snow.png';

function App() {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(null); // Weather data state
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Mapping weather codes to icons
  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  // Function to fetch weather data from OpenWeather API
  const search = async (city) => {
    setLoading(true);
    setError(null); // Reset previous errors

    try {
      const apiKey = import.meta.env.VITE_APP_ID; // Fetch API key from environment
      if (!apiKey) {
        throw new Error('API key is missing. Add it to your .env file as VITE_APP_ID.');
      }

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();

      // Extract the necessary data and set the state
      const icon = allIcons[data.weather[0]?.icon] || clear_icon; // Fallback icon
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed, 
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setError(error.message); // Set error message
    } finally {
      setLoading(false); // End loading state
    }
  };

  // Fetch default weather data for "Kathmandu" on initial render
  useEffect(() => {
    search('Kathmandu');
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Pass weatherData, loading, and error as props to All_UI */}
        <Route 
          path="/" 
          element={<All_UI 
                      weatherData={weatherData} 
                      search={search} 
                      loading={loading} 
                      error={error} />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
