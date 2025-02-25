import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  current: null,
  minutely: null,
  hourly: null,
  daily: null,
 };

export const selectCurrent = (state) => state.weather.current;
export const selectMinutely = (state) => state.weather.minutely;
export const selectHourly = (state) => state.weather.hourly;
export const selectDaily = (state) => state.weather.daily;

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    gotOneCallWeather: (state, action) => {
      state.current = action.payload.current;
      state.minutely = action.payload.minutely;
      state.hourly = action.payload.hourly;
      state.daily = action.payload.daily;
    },
  },
});

export const getOneCallWeather = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/weather/');
    dispatch(gotOneCallWeather(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const { gotOneCallWeather } =
  weatherSlice.actions;
export default weatherSlice.reducer;
