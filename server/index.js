const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());  // Allow CORS requests from your frontend

// Proxy endpoint
app.get('/api/news', async (req, res) => {
    const { country, category, page, pageSize } = req.query;
    const apiKey = process.env.NEWS_API_KEY; // Store your API key securely in environment variables
    
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;

    try {
        const response = await axios.get(url);
        res.json(response.data); // Send the API response to the frontend
    } catch (error) {
        res.status(500).send('Error fetching news');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
