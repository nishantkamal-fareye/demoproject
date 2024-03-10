const express = require('express');
const axios = require('axios');

const app = express();
const port = 6000;

app.get('/weather', async (req, res) => {
    try {
        // Make API call to weather service
        const apiUrl = 'https://api.weatherapi.com/v1/forecast.json?key=1a7ee52df2f34d61b31171106241003&q=28.52,77.19&days=7';
        const response = await axios.get(apiUrl);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
