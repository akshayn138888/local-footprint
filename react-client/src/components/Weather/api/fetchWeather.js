import axios from "axios";

const URL = "https://api.openweathermap.org/data/2.5/weather";

export const fetchWeather = async query => {
  const { data } = await axios.get(URL, {
    params: {
      q: query,
      units: "metric",
      APPID: "e49d06bd8cb8ec27ad353ad9d1a0224f"
    }
  });

  return data;
};
