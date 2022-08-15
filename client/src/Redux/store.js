import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './adminSlice';
import listsReducer from './listsSlice';
import weatherReducer from './weatherSlice';
import calendarReducer from './calendarSlice';

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    lists: listsReducer,
    weather: weatherReducer,
    calendar: calendarReducer,
  },
});
