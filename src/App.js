import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function FetchWeatherData() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect( () => {
    const fetchDataFromOpenAPI = async () => {
      try {
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
  },[]);


  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Location: {weather.location.name}, {weather.location.country}</h2>
          <p>Temperature: {weather.now.temperature}°C</p>
          <p>Weather: {weather.now.text}</p>
          {/* Add more information as needed */}
          <p>Last Update: {weather.last_update}</p>
        </div>
      )}
    </div>
  )
}

function App() {
  return (
    <>
    <FetchWeatherData></FetchWeatherData>
    </>
  ) 
}

export default App;
