import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const getWeather = () => {
    // Replace 'YOUR_API_KEY' with the API key you obtained from OpenWeatherMap
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

    // Check if the city input is not empty
    if (city.trim() === '') {
      alert('Please enter a city');
      return;
    }

    // Make API request to OpenWeatherMap using Axios
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
      .then(response => {
        // Handle the response data
        const temperature = response.data.main.temp;
        const description = response.data.weather[0].description;

        // Set the weather state
        setWeather({ temperature, description });
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data. Please try again.');
      });
  };

  return (
    <div>
      <h1>Weather App</h1>
      <label htmlFor="city">Enter City:</label>
      <input
        type="text"
        id="city"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>Get Weather</button>
      {weather && (
        <div>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Description: {weather.description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
