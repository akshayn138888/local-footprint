import React, { useState, useEffect } from "react";
import { fetchWeather } from "./api/fetchWeather";
import "./Weather.css";

const Weather = () => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    fetchWeather("Vancouver").then(data => {
      setWeather(data);
    });
  }, []);

  return (
    <div style={{ backgroundImage: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)", width: "80%", borderRadius: "10%", paddingTop: "7.5%" }}>
      {weather.main && (
        <div>
          <h2 className="city-name" style={{ margin: 0, marginBottom: "20px", textAlign: "center" }}>
            <span>{weather.name}</span>
          </h2>
          <div className="city-temp">
            {Math.round(weather.main.temp)}
            <sup>&deg;</sup>
          </div>
          <div className="info">
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
