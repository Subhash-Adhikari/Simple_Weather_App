import React, { useRef } from 'react';

// Receive `weatherData` as a prop
const All_UI = ({ weatherData, search }) => {
  const inputRef = useRef();

  // Add a fallback for when weatherData is not available
  if (!weatherData) {
    return <div>Loading weather data...</div>;
  }

  const handleSearchClick = () => {
    // Trigger the search function on button click
    search(inputRef.current.value);
  };

  return (
    <>
      <div className="weatherApp">
        {/* Search Section */}
        <div className="searchSec">
          <input
            ref={inputRef}
            type="search"
            placeholder="Search"
            className="searchBar"
          />
          <button className="btn" onClick={handleSearchClick}>
            <img
              src="/src/assets/search.png"
              alt="Search Icon"
              className="searchIcon"
            />
          </button>
        </div>

        {/* Weather Icon and Info */}
        <div className="imageSec">
          <img
            src={weatherData.icon || '/src/assets/cloud.png'}
            alt="Weather Icon"
            className="weatherImg"
          />
          <div className="temploc">
            <div className="tempreature">
              <h1>{weatherData.temperature}°C</h1>
            </div>
            <div className="location">
              <h1>{weatherData.location}</h1>
            </div>
          </div>
        </div>

        {/* Humidity and Wind Speed */}
        <div className="humwin">
          <div className="humidity">
            <img
              src="/src/assets/humidity.png"
              alt="Humidity Icon"
              className="pichum"
            />
            <div className="humwin1">
              <h1 className="percent">{weatherData.humidity}%</h1>
              <h1 className="humidity">Humidity</h1>
            </div>
          </div>
          <div className="windSpeed">
            <img
              src="/src/assets/wind.png"
              alt="Wind Icon"
              className="picwind"
            />
            <div className="humwin2">
              <h1 className="percent">{weatherData.windSpeed} km/h</h1>
              <h1 className="humidity">Wind Speed</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default All_UI;
