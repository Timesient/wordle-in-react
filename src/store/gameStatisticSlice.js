import { createSlice } from '@reduxjs/toolkit';

/* initial state */
let initialState = {
  gamesPlayed: 0,
  gamesWon: 0,
  winPercentage: 0,

  guesses: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, fail: 0},
  averageGuesses: 0,

  currentStreak: 0,
  maxStreak: 0,
};


/* local storage operations */
const storageKey = 'wordle-statistic';
if (window.localStorage[storageKey] === undefined) {
  window.localStorage.setItem(storageKey, JSON.stringify(initialState));
} else {
  initialState = JSON.parse(window.localStorage[storageKey]);
}


/* slice definition */
export const gameStatisticSlice = createSlice({
  name: 'gameStatistic',
  initialState,
  reducers: {
    updateWinnedGameStatistic: (state, action) => {
      const guessCount = action.payload;
      
      state.gamesPlayed += 1;
      state.gamesWon += 1;
      state.winPercentage = Math.floor(state.gamesWon / state.gamesPlayed * 100);
      
      state.guesses[guessCount] += 1;
      state.averageGuesses = calculateAverageGuesses(state.guesses, state.gamesWon);

      state.currentStreak += 1;
      if (state.currentStreak > state.maxStreak) state.maxStreak = state.currentStreak;

      // update local storage
      window.localStorage.setItem(storageKey, JSON.stringify(state));
    },
    updateFailedGameStatistic: (state) => {
      state.gamesPlayed += 1;
      state.winPercentage = Math.floor(state.gamesWon / state.gamesPlayed * 100);
      
      state.guesses.fail += 1;
      state.currentStreak = 0;

      // update local storage
      window.localStorage.setItem(storageKey, JSON.stringify(state));
    }
  }
});


/* assistant functions */
function calculateAverageGuesses(guesses, wonCount) {
  return (guesses[1] + guesses[2] * 2 + guesses[3] * 3 + guesses[4] * 4 + guesses[5] * 5 + guesses[6] * 6) / wonCount;
}


/* exports */
export const {
  updateWinnedGameStatistic,
  updateFailedGameStatistic,
} = gameStatisticSlice.actions;

export const selectGameStatistic = (state) => state.gameStatistic;

export default gameStatisticSlice.reducer;