import { useState, useEffect } from "react";
import axios from "axios";

function FetchWeatherData() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataFromOpenAPI = async () => {
      try {
        {/* API 文档:https://seniverse.yuque.com/hyper_data/api_v3/nyiu3t?#%20%E3%80%8A%E5%A4%A9%E6%B0%94%E5%AE%9E%E5%86%B5%E3%80%8B   */}
        const response = await axios.get('https://api.seniverse.com/v3/weather/now.json?key=S6WfPF1QI9TGpIpCf&location=beijing&language=zh-Hans&unit=c');
        const { results } = response.data;

        if (results.length > 0) {
          const { location, now, last_update } = results[0];
          setWeather({ location, now, last_update });
        } else {
          console.error('No results found in the response.');
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDataFromOpenAPI();
  }, []);

  return (
    <div className="weather-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="weather-content">
          <h2>{weather?.location?.name}, {weather?.location?.country}</h2>
          <p>Weather: {weather?.now?.text}</p>
          <p>Temperature: {weather?.now?.temperature}°C</p>
          <p>Last Update: {new Date(weather?.last_update).toLocaleString()}</p>
          {/* 这里使用的是新知天气 API, doc URL: https://seniverse.yuque.com/hyper_data/api_v3/yev2c3  */} 
          <img src={`${process.env.PUBLIC_URL}/${weather.now.code}.png`} alt="Weather Icon" className="weather-icon" />
        </div>
      )}
    </div>
  );
}

export default FetchWeatherData;
