import React, { useState } from "react";
import "./App.css";
import axios from "axios";

export const WeatherApp = () => {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = "c795a89574e0479680073112242802"; // Replace with your actual API key

  const fetchData = async () => {
    if (!location.trim()) {
      alert("Please enter a city name.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`
      );
      setWeather(response.data);
    } catch (error) {
      alert(`Failed to fetch weather data: ${error.message}`);
      setWeather(null);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="container-child">
        <h1>Weather App</h1>
        <input
          type="text"
          placeholder="Enter Location Here"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="button" onClick={fetchData}>
          Search
        </button>
        {loading && <p className="loading-text">Loading data...</p>}
        {weather && (
          <div className="weather-cards">
            <div className="weather-card">
              <p>Temperature: {weather.current.temp_c}°C</p>
            </div>
            <div className="weather-card">
              <p>Condition: {weather.current.condition.text}</p>
            </div>
            <div className="weather-card">
              <p>Humidity: {weather.current.humidity}%</p>
            </div>
            <div className="weather-card">
              <p>Wind Speed: {weather.current.wind_kph} kph</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

