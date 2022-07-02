import { configureStore } from '@reduxjs/toolkit';
import switchReducer from './switchSlice';
import gameStateReducer from './gameStateSlice';
import gameStatisticReducer from './gameStatisticSlice';

export default configureStore({
  reducer: {
    switch: switchReducer,
    gameState: gameStateReducer,
    gameStatistic: gameStatisticReducer,
  },
});