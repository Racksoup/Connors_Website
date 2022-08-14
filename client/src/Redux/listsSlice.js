import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  lists: [],
  list: [],
};

export const selectLists = (state) => state.lists.lists;
export const selectList = (state) => state.lists.list;

export const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    createdList: (state, action) => {
      state.lists = [...state.lists, action.payload.item];
    },
    gotLists: (state, action) => {
      state.lists = action.payload;
    },
    deletedList: (state, action) => {
      state.lists = state.lists.filter((list) => list.title !== action.payload.title);
      state.list = [];
    },
    updatedList: (state, action) => {
      state.lists = state.lists.map((list) => {
        if (list._id !== action.payload._id) {
          return list;
        } else {
          return action.payload;
        }
      });
    },
    createdListItem: (state, action) => {
      state.list = [...state.list, action.payload];
    },
    gotList: (state, action) => {
      state.list = action.payload;
    },
    deletedListItem: (state, action) => {
      state.list = state.list.filter((item) => item.title !== action.payload.title);
    },
    updatedListItem: (state, action) => {
      state.list = state.list.map((item) => {
        if (item._id !== action.payload._id) {
          return item;
        } else {
          return action.payload;
        }
      });
    },
  },
});

export const createList = (list) => async (dispatch) => {
  try {
    const res = await axios.post('api/lists', list);
    dispatch(createList(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const getLists = () => async (dispatch) => {
  try {
    const res = await axios.get('api/lists');
    dispatch(gotLists(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const deleteList = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`api/lists/${id}`);
    dispatch(deletedList(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const updateList = (list) => async (dispatch) => {
  try {
    const res = await axios.put(`api/lists/${list._id}`, list);
    dispatch(updatedList(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const createListItem = (item) => async (dispatch) => {
  try {
    const res = await axios.post('api/listItem', item);
    dispatch(createdListItem(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const getList = (listId) => async (dispatch) => {
  try {
    const res = await axios.get(`api/listItem/${listId}`);
    console.log(res.data);
    dispatch(gotList(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const deleteListItem = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`api/listItem/${id}`);
    dispatch(deleteListItem(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const updateListItem = (item) => async (dispatch) => {
  try {
    const res = await axios.put(`api/listItem/${item._id}`, item);
    dispatch(updatedListItem(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const {
  createdList,
  gotLists,
  deletedList,
  updatedList,
  createdListItem,
  gotList,
  deletedListItem,
  updatedListItem,
} = listsSlice.actions;

export default listsSlice.reducer;
