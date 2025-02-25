const Historical = require('../../models/Historical');
const WeatherID = process.env.OPEN_WEATHER_MAP_ID;
const Latitude = process.env.LATITUDE;
const Longitude = process.env.LONGITUDE;

const axios = require('axios');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
  console.log('one-call')
  try {
    // Optionally validate input parameters here if coming from req.query or req.params
    const weather = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${Latitude}&lon=${Longitude}&exclude=alerts&appid=${WeatherID}`
    );
    console.log(weather.data);
    res.json(weather.data);
  } catch (err) {
    console.error('Error fetching weather data:', err);

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
