import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  fr: [],
  en: {},
};

export const selectFrench = (state) => state.news.fr;
export const selectEnglish = (state) => state.news.en;

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    gotNews: (state, action) => {
      state.fr = action.payload;
    },
    gotTranslation: (state, action) => {
      state.en = action.payload;
    },
  },
});

export const { gotNews, gotTranslation } = newsSlice.actions;

export const getNews = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/news/fr');
    dispatch(gotNews(res.data));
  } catch (error) {
    console.log(error.message);
  }
};

export const getTranslation = (article) => async (dispatch) => {
  try {
    const res = await axios.post('/api/news/en', article);
    dispatch(gotTranslation(res.data));
  } catch (error) {
    console.log(error.message);
  }
};

export default newsSlice.reducer;
