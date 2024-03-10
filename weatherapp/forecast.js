require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const port = 6000;

const apiUrl = process.env.API_URL;

app.get('/weather', async (req, res) => {
    try {
        // Make API call to weather service
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
