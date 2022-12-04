import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  tasks: null,
};

export const selectTasks = (state) => state.schedule.tasks;

export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    createdTask: (state, action) => {
      state.tasks = [...state.tasks, action.payload];
    },
    updatedTask: (state, action) => {
      state.tasks = state.tasks.map((task) => {
        if (task._id !== action.payload._id) {
          return task;
        } else {
          return action.payload;
        }
      });
    },
    deletedTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload._id);
    },
    gotTask: (state, action) => {
      state.task = action.payload;
    },
    gotTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const createTask = (task) => async (dispatch) => {
  try {
    const res = await axios.post('api/schedule', task);
    dispatch(createdTask(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const updateTask = (task) => async (dispatch) => {
  try {
    const res = await axios.put('api/schedule', task);
    dispatch(updatedTask(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const deleteTask = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`api/schedule/${id}`);
    dispatch(deletedTask(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const getTask = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`api/schedule/task/${id}`);
    dispatch(gotTask(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const getTasks = (dates) => async (dispatch) => {
  try {
    const res = await axios.get(`api/schedule/tasks/${dates[0]}/${dates[13]}`);
    dispatch(gotTasks(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const { createdTask, updatedTask, deletedTask, gotTask, gotTasks } =
  scheduleSlice.actions;
export default scheduleSlice.reducer;
