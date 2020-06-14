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
    <div>
      {weather.main && (
        <div>
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
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
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
