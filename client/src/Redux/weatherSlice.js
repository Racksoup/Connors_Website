import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  forecast: null,
  current: null,
  minutely: null,
  hourly: null,
  daily: null,
  historical: null,
  savedWeather: null,
  weatherPosted: false,
  isHistorical: false,
  isSavedWeather: false,
};

export const selectForecast = (state) => state.weather.forecast;
export const selectCurrent = (state) => state.weather.current;
export const selectMinutely = (state) => state.weather.minutely;
export const selectHourly = (state) => state.weather.hourly;
export const selectDaily = (state) => state.weather.daily;
export const selectHistorical = (state) => state.weather.historical;
export const selectSavedWeather = (state) => state.weather.savedWeather;
export const selectWeatherPosted = (state) => state.weather.weatherPosted;
export const selectIsHistorical = (state) => state.weather.isHistorical;
export const selectIsSavedWeather = (state) => state.weather.isSavedWeather;

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    weatherPosted: (state, action) => {
      state.weatherPosted = true;
    },
    gotSavedWeather: (state, action) => {
      state.savedWeather = action.payload;
      state.isSavedWeather = true;
    },
    gotHistorical: (state, action) => {
      state.historical = action.payload;
      state.isHistorical = true;
    },
    gotOneCallWeather: (state, action) => {
      console.log(action.payload);
      let daily = action.payload.daily;
      state.current = action.payload.current;
      state.minutely = action.payload.minutely;
      state.hourly = action.payload.hourly;
      state.daily = daily;
    },
    gotForecast: (state, action) => {
      state.forecast = action.payload;
    },
  },
});

export const getFourDay = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/weather/');
    dispatch(gotForecast(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const getOneCallWeather = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/weather/one-call');
    dispatch(gotOneCallWeather(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const getHistorical = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/weather/historical');
    dispatch(gotHistorical(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const getSavedWeather = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/weather/saved-weather');
    dispatch(gotSavedWeather(res.data));
    dispatch(postSavedWeather());
  } catch (err) {
    console.log(err);
  }
};

export const postSavedWeather = () => async (dispatch, getState) => {
  const { historical, savedWeather, weatherPosted } = getState().weather;
  let newHistorical;
  if (historical && savedWeather && !weatherPosted) {
    dispatch(weatherPosted());
    newHistorical = historical.map((day) => {
      let newDay = {};
      newDay.date = new Date(day.current.dt * 1000);
      newDay.dt = day.current.dt;
      newDay.data = day;
      return newDay;
    });
    for (let i = 0; i < savedWeather.length; i++) {
      newHistorical = newHistorical.filter((day) => day.dt !== savedWeather[i].dt);
    }
    try {
      newHistorical.map(async (day) => {
        await axios.post('/api/weather/saved-weather', day);
      });
    } catch (err) {
      console.log(err);
    }
  }
};

export const { weatherPosted, gotSavedWeather, gotHistorical, gotForecast, gotOneCallWeather } =
  weatherSlice.actions;
export default weatherSlice.reducer;
