import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './adminSlice';
import listsReducer from './listsSlice';

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    lists: listsReducer,
  },
});
