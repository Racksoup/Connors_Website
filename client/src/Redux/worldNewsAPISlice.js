import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  worldNews: null,
 };

export const selectWorldNews = (state) => state.worldNews.worldNews;

export const worldNewsAPISlice = createSlice({
  name: 'worldNews',
  initialState,
  reducers: {
    gotWorldNews: (state, action) => {
      state.worldNews = action.payload;
    },
  },
});

export const getWorldNews = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/world-news-api/');
    dispatch(gotWorldNews(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const { gotWorldNews } =
  worldNewsAPISlice.actions;
export default worldNewsAPISlice.reducer;
