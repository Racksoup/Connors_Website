import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './adminSlice';
import listsReducer from './listsSlice';
import weatherReducer from './weatherSlice';
import calendarReducer from './calendarSlice';
import newsReducer from './newsSlice';
import scheduleReducer from './scheduleSlice';

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    lists: listsReducer,
    weather: weatherReducer,
    calendar: calendarReducer,
    news: newsReducer,
    schedule: scheduleReducer,
  },
});
