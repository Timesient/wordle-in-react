import { configureStore } from '@reduxjs/toolkit';
import switchReducer from './switchSlice';

export default configureStore({
  reducer: {
    switch: switchReducer,
  },
});