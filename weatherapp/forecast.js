const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = 7004;

const API_KEY = process.env.API_KEY;

// Define a route for the root path of the application
app.get('/', (req, res) => {
  const address = req.query.address; // Read the address query parameter from the request
  const url = `http://api.openweathermap.org/data/2.5/forecast?q=${address}&units=metric&appid=${API_KEY}`;

  // Make an HTTP GET request to the API using axios
  axios.get(url)
    .then(response => {
      const data = response.data;
      const cityName = data.city.name;
      const forecastList = data.list;

      // Extract relevant information from the forecast list
      const forecastData = forecastList.map(item => {
        const dateTime = new Date(item.dt * 1000).toLocaleString(); // Convert UNIX timestamp to a readable date and time
        const temperature = item.main.temp;
        const weatherDescription = item.weather[0].description;
        return { dateTime, temperature, weatherDescription };
      });

      // Construct the response message
      const message = `<h1>Weather Forecast for ${cityName}</h1>`;
      const forecastItems = forecastData.map(item => `<p>Date/Time: ${item.dateTime}, Temperature: ${item.temperature}&deg;C, Weather: ${item.weatherDescription}</p>`).join('');
      const htmlResponse = `<html><body><div id='container'>${message}${forecastItems}</div></body></html>`;

      res.send(htmlResponse);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error occurred while fetching weather forecast data');
    });
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
