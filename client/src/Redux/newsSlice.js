import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  news: [],
};

export const selectNews = (state) => state.news.news;

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    gotNews: (state, action) => {
      state.news = action.payload;
    },
  },
});

export const { gotNews } = newsSlice.actions;

export const getNews = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/news');
    dispatch(gotNews(res.data));
  } catch (error) {
    console.log(error.message);
  }
};

export default newsSlice.reducer;
