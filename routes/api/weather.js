const Historical = require('../../models/Historical');
const WeatherID = process.env.OPEN_WEATHER_MAP_ID;
const Latitude = process.env.LATITUDE;
const Longitude = process.env.LONGITUDE;

const axios = require('axios');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const forecast = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=Ottawa,ca&appid=${WeatherID}`
    );
    res.json(forecast.data);
  } catch (err) {
    console.log(err.message);
  }
});

router.get('/one-call', async (req, res) => {
  try {
    const weather = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${Latitude}&lon=${Longitude}&exclude=alerts&appid=${WeatherID}`
    );
    res.json(weather.data);
  } catch (err) {
    console.log(err.message);
  }
});

router.get('/historical', async (req, res) => {
  let currDate = new Date();
  currDate.setHours(23, 0, 0, 0);
  currDate = Math.round(currDate.getTime() / 1000);
  let allPromises = [];
  try {
    for (let i = 0; i < 5; i++) {
      currDate -= 86400;
      allPromises.push(
        await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${Latitude}&lon=${Longitude}&dt=${currDate}&appid=${WeatherID}`
        )
      );
    }
    allPromises = allPromises.map((promise) => {
      promise = promise.data;
      return promise;
    });

    res.json(allPromises);
  } catch (err) {
    console.log(err.message);
  }
});

router.get('/saved-weather', async (req, res) => {
  try {
    const allWeather = await Historical.find();
    res.json(allWeather);
  } catch (err) {
    console.log(err.message);
  }
});

router.post('/saved-weather', async (req, res) => {
  const { date, dt, data } = req.body;
  const postItem = { date, dt, data };
  try {
    const item = new Historical(postItem);
    await item.save();
    res.json({
      item,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
