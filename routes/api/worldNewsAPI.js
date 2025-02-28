const WorldNewsAPIKey = process.env.WORLD_NEWS_API_KEY;

const axios = require('axios');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
  console.log('world news api hit');
  try {
    const news = await axios.get(
      `https://api.worldnewsapi.com/top-news`, {
        params: {
          'source-country': 'ca',
          'language': 'en'
        }, 
        headers: {
          'x-api-key': WorldNewsAPIKey
        }
      }
    );
    console.log(news.data);
    res.json(news.data);
  } catch (err) {
    console.error('Error fetching World News API data', err);
    // If the error is from Axios, it may contain a response with a status code
    if (err.response) {
      return res
        .status(err.response.status)
        .json({ error: err.response.data });
    }
    // For other errors, forward the error to Express error middleware
    next(err);
  }
});

module.exports = router;
