const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = 3020;

const API_KEY = "0463d36f8a64d3405f77ae069770d0a4";

// Define a route for the root path of the application
app.get('/', (req, res) => {
  const address = req.query.address; // Read the address query parameter from the request
  const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${address}&units=metric&appid=${API_KEY}`;
  const forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${address}&units=metric&cnt=5&appid=${API_KEY}`;

  // Make an HTTP GET request to the current weather API using axios
  axios.get(weatherUrl)
    .then(response => {
      const currentWeatherData = response.data;
      const cityName = currentWeatherData.name;
      const currentTemperature = currentWeatherData.main.temp;

      // Make an HTTP GET request to the 5-day forecast weather API using axios
      return axios.get(forecastUrl)
        .then(forecastResponse => {
          const forecastData = forecastResponse.data;
          const forecastList = forecastData.list;

          // Extract relevant forecast information for the next 5 days
          const forecastMessages = forecastList.map(item => {
            const forecastDate = new Date(item.dt * 1000).toLocaleDateString();
            const forecastTime = new Date(item.dt * 1000).toLocaleTimeString();
            const forecastTemperature = item.main.temp;
            return `Date: ${forecastDate}<br>Time: ${forecastTime}<br>Temperature: ${forecastTemperature}&deg;C`;
          });

          // Combine current weather and 5-day forecast information
          const message = `
            <h1>City Name: ${cityName}</h1>
            <h2>Current Weather:</h2>
            <p>Temperature: ${currentTemperature}&deg;C</p>
            <h2>5-Day Weather Forecast:</h2>
            ${forecastMessages.join('<br><br>')}
          `;

          res.send(`<html><body><div id='container'>${message}</div></body></html>`);
        });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error occurred while fetching weather data');
    });
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
