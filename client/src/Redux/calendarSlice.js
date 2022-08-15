import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  journal: {},
  journals: [],
};

export const selectJournal = (state) => state.calendar.journal;
export const selectJournals = (state) => state.calendar.journals;

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    clearJournal: (state, action) => {
      state.journal = {};
    },
    clearJournals: (state, action) => {
      state.journals = [];
    },
    gotMonthsJornals: (state, action) => {
      state.journals = action.payload;
    },
    gotOneJournal: (state, action) => {
      state.journal = action.payload;
    },
    createJournal: (state, action) => {
      state.journal = action.payload.item;
    },
    updateJournal: (state, action) => {
      state.journal = action.payload;
    },
  },
});

export const createJournalPost = (item, file) => async (dispatch) => {
  let data = new FormData();
  if (file) {
    data.append('file', file);
  }
  data.append('title', item.title);
  data.append('text', item.text);
  data.append('date', item.date);

  try {
    const config = {
      headers: {
        accept: 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      },
    };
    const res = await axios.post('/api/journal', data, config);
    dispatch(createJournal(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const getOneJournal = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/journal/${id}`);
    dispatch(gotOneJournal(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const getOneJournalByDate = (journal, date) => async (dispatch) => {
  try {
    if (journal) {
      dispatch(gotOneJournal(journal));
    } else {
      let item = { title: '', text: '', date: date };
      dispatch(createJournalPost(item));
    }
  } catch (err) {
    console.log(err);
  }
};

export const getMonthsJournals = (date) => async (dispatch) => {
  try {
    let year = date.getFullYear();
    let month = date.getMonth();
    const res = await axios.get(`/api/journal/month/${year}/${month}`);
    dispatch(gotMonthsJornals(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const updateJournalPost = (item, file) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const oldItem = await axios.get(`/api/journal/${item._id}`);
    if (file !== '' && file !== null && file !== undefined) {
      let data = new FormData();
      data.append('file', file);
      const fileConfig = {
        headers: {
          accept: 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        },
      };
      if (oldItem.data.image_filename) {
        await axios.delete(`/api/journal/image/${oldItem.data.image_filename}`);
      }
      const newImage = await axios.post('/api/journal/image', data, fileConfig);
      item.image_filename = newImage.data.filename;
    }
    if (item) {
      const res = await axios.put(`/api/journal/${item._id}`, item, config);
      dispatch(updateJournal(res.data));
    }
  } catch (err) {
    console.log(err);
  }
};

export const {
  clearJournal,
  clearJournals,
  gotMonthsJornals,
  gotOneJournal,
  createJournal,
  updateJournal,
} = calendarSlice.actions;
export default calendarSlice.reducer;
