import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './adminSlice';
import listsReducer from './listsSlice';
import weatherReducer from './weatherSlice';

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    lists: listsReducer,
    weather: weatherReducer,
  },
});
