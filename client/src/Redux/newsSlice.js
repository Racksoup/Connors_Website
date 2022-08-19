import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  fr: {},
  en: {},
};

export const selectFrench = (state) => state.news.fr;
export const selectEnglish = (state) => state.news.en;

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    // gotNews: (state, action) => {
    //   state.fr = action.payload;
    // },
    gotTranslation: (state, action) => {
      state.fr = action.payload;
    },
    gotRandomWiki: (state, action) => {
      state.en = action.payload;
    },
  },
});

export const { gotTranslation, gotRandomWiki } = newsSlice.actions;

export const getTranslation = (article) => async (dispatch) => {
  article.language = 'fr';
  console.log(article);
  try {
    const res = await axios.post('/api/news/translate', article);
    dispatch(gotTranslation(res.data));
  } catch (error) {
    console.log(error.message);
  }
};

export const getRandomWiki = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/news/wiki/random');
    dispatch(gotRandomWiki(res.data));
  } catch (error) {
    console.log(error.message);
  }
};

// export const getNews = () => async (dispatch) => {
//   try {
//     const res = await axios.get('/api/news/fr');
//     dispatch(gotNews(res.data));
//   } catch (error) {
//     console.log(error.message);
//   }
// };
export default newsSlice.reducer;
