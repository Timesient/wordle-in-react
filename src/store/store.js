import { configureStore } from '@reduxjs/toolkit';
import switchReducer from './switchSlice';
import gameStateReducer from './gameStateSlice';

export default configureStore({
  reducer: {
    switch: switchReducer,
    gameState: gameStateReducer,
  },
});