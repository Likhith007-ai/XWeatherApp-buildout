import { useState } from "react";
import "./App.css";
import axios from "axios";

export const WeatherApp = () => {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!location) {
      setWeather(null);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=c795a89574e0479680073112242802&q=${location}`
      );
      setWeather(response.data);
      console.log(response.data);
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
        <button type="submit" onClick={fetchData}>
          Submit
        </button>
        {loading ? (
          <p>Loading...</p>
        ) : (
          weather && (
            <div>
              <div className="weather-box">
                <p>Temperature: {weather.current.temp_c}°C</p>
              </div>
              <div className="weather-box">
                <p>Condition: {weather.current.condition.text}</p>
              </div>
              <div className="weather-box">
                <p>Humidity: {weather.current.humidity}%</p>
              </div>
              <div className="weather-box">
                <p>Wind Speed: {weather.current.wind_kph} kph</p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
