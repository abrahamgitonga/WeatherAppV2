import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

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
    
    <div className="container mx-auto my-8 p-8 bg-gray-100 rounded shadow-md">
      <h1 className="text-4xl font-bold mb-4">Weather App</h1>
      <label htmlFor="city" className="text-lg">Enter City:</label>
      <div className="flex">
        <input
          type="text"
          id="city"
          className="border p-2 mr-2"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={getWeather}
        >
          Get Weather
        </button>
      </div>
      {weather && (
        <div className="mt-4">
          <p className="text-lg">Temperature: {weather.temperature}°C</p>
          <p className="text-lg">Description: {weather.description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
