import { createSlice } from '@reduxjs/toolkit';
import { isInWordList, getSolution, getEvaluation, toastMsgWhenWin, orders } from '../lib/wordConfig';

const initialState = {
  isHardMode: false,
  solution: getSolution(),
  gameStatus: "IN_PROGRESS",
  boardState: ['', '', '', '', '', ''],
  evaluations: [null, null, null, null, null, null],
  currentRowIndex: 0,
  lastPlayedTimestamp: 0,
  lastCompletedTimestamp: 0,

  toasts: [],
  isRunningInitEvaluationAnimation: true,
  isRunningEvaluationAnimation: false,
  isRunningInvalidAnimation: false,
  isRunningWinAnimation: false,
  isRunningFailAnimation: false,
};

function isAllowToOperate(state) {
  return !state.isRunningInitEvaluationAnimation && !state.isRunningEvaluationAnimation && state.gameStatus === 'IN_PROGRESS';
}

function wordCheckForHardModeRule(state, word) {
  // 1. correct check
  for (let i = 0; i < 6; i++) {
    const evaluation = state.evaluations[i];
    if (!evaluation) break;

    for (let j = 0; j < 5; j++) {
      if (evaluation[j] === 'correct') {
        const correctLetter = state.boardState[i][j];
        if (word[j] !== correctLetter) {
          return { isValid: false, msg: `${orders[j]} letter must be ${correctLetter.toUpperCase()}` }
        }
      }
    }
  }

  // 2. present check
  for (let i = 0; i < 6; i++) {
    const evaluation = state.evaluations[i];
    if (!evaluation) break;

    for (let j = 0; j < 5; j++) {
      if (evaluation[j] === 'present') {
        const presentLetter = state.boardState[i][j];
        if (!word.split('').includes(presentLetter)) {
          return { isValid: false, msg: `Guess must contain ${presentLetter.toUpperCase()}` }
        }
      }
    }
  }

  return { isValid: true, msg: '' };
}

export const gameStateSlice = createSlice({
  name: 'gameState',
  initialState,
  reducers: {
    addLetterOnCurrentRow: (state, action) => {
      if (!isAllowToOperate(state)) return;

      const newLetter = action.payload;
      const currentRowState = state.boardState[state.currentRowIndex];
      if (currentRowState.length < 5) {
        state.boardState[state.currentRowIndex] = currentRowState + newLetter;
      }
    },
    delLetterOnCurrentRow: (state) => {
      if (!isAllowToOperate(state)) return;

      const currentRowState = state.boardState[state.currentRowIndex];
      state.boardState[state.currentRowIndex] = currentRowState.slice(0, currentRowState.length - 1);
    },
    requestEvaluation: (state) => {
      if (!isAllowToOperate(state)) return;

      const currentRowState = state.boardState[state.currentRowIndex];

      if (currentRowState.length !== 5) {
        state.toasts.unshift({ msg: 'Not enough letters', deleteDelay: 1000, timestamp: Date.now() });
        state.isRunningInvalidAnimation = true;
      } else if (!isInWordList(currentRowState)) {
        state.toasts.unshift({ msg: 'Not in word list', deleteDelay: 1000, timestamp: Date.now() });
        state.isRunningInvalidAnimation = true;
      } else {
        if (state.isHardMode) {
          const result = wordCheckForHardModeRule(state, currentRowState);
          if (!result.isValid) {
            state.toasts.unshift({ msg: result.msg, deleteDelay: 1000, timestamp: Date.now() });
            state.isRunningInvalidAnimation = true;
            return;
          }
        }

        const evaluation = getEvaluation(currentRowState);
        state.evaluations[state.currentRowIndex] = evaluation;
        state.isRunningEvaluationAnimation = true;
        state.lastPlayedTimestamp = Date.now()
        
        if (currentRowState === state.solution) { // win
          state.gameStatus = 'WIN';
          state.isRunningWinAnimation = true;
          state.lastCompletedTimestamp = Date.now();
        } else if (state.currentRowIndex === 5){ // fail
          state.gameStatus = 'FAIL';
          state.isRunningFailAnimation = true;
          state.lastCompletedTimestamp = Date.now();
        } else { // continue
          state.currentRowIndex += 1;
        }
      }
    },
    setIsHardMode: (state, action) => {
      state.isHardMode = action.payload;
    },
    setIsRunningInitEvaluationAnimation: (state, action) => {
      state.isRunningInitEvaluationAnimation = action.payload;
    },
    setIsRunningEvaluationAnimation: (state, action) => {
      state.isRunningEvaluationAnimation = action.payload;
    },
    setIsRunningInvalidAnimation: (state, action) => {
      state.isRunningInvalidAnimation = action.payload;
    },
    setIsRunningWinAnimation: (state, action) => {
      state.isRunningWinAnimation = action.payload;
    },
    addWinToast: (state) => {
      state.toasts.unshift({ msg: toastMsgWhenWin[state.currentRowIndex], deleteDelay: 2000, timestamp: Date.now() });
    },
    addFailToast: (state) => {
      state.toasts.unshift({ msg: state.solution.toUpperCase(), deleteDelay: 24 * 60 * 60 * 1000, timestamp: Date.now() });
    },
    addFailToEnableHardModeToast: (state) => {
      state.toasts.unshift({ msg: 'Hard mode can only be enabled at the start of a round', deleteDelay: 1000, timestamp: Date.now() });
    },
    delToast: (state, action) => {
      const timestamp = action.payload;

      let targetIndex;
      state.toasts.forEach((toast, index) => {
        if (toast.timestamp === timestamp) targetIndex = index;
      });

      if (targetIndex !== undefined) {
        state.toasts.splice(targetIndex, 1);
      }
    }
  }
});

export const {
  addLetterOnCurrentRow,
  delLetterOnCurrentRow,
  requestEvaluation,
  setIsHardMode,
  setIsRunningInitEvaluationAnimation,
  setIsRunningEvaluationAnimation,
  setIsRunningInvalidAnimation,
  setIsRunningWinAnimation,
  addWinToast,
  addFailToast,
  addFailToEnableHardModeToast,
  delToast,
} = gameStateSlice.actions;

export const selectBoardState = (state) => {
  const boardState = state.gameState.boardState;
  const evaluations = state.gameState.evaluations;

  return boardState.map((rowContent, rowIndex) => {
    let letters = rowContent.split('');
    letters = letters.concat(Array.from({ length: 5 - letters.length }, () => ''));

    return letters.map((letter, letterIndex) => {
      return {
        letter,
        evaluation: evaluations[rowIndex] ? evaluations[rowIndex][letterIndex] : null
      }
    })
  })
};

export const selectIsHardMode = (state) => state.gameState.isHardMode;

export const selectGameStatus = (state) => state.gameState.gameStatus;

export const selectIsRunningInitEvaluationAnimation = (state) => state.gameState.isRunningInitEvaluationAnimation;

export const selectIsRunningEvaluationAnimation = (state) => state.gameState.isRunningEvaluationAnimation;

export const selectIsRunningInvalidAnimation = (state) => state.gameState.isRunningInvalidAnimation;

export const selectIsRunningWinAnimation = (state) => state.gameState.isRunningWinAnimation;

export const selectIsRunningFailAnimation = (state) => state.gameState.isRunningFailAnimation;

export const selectCurrentRowIndex = (state) => state.gameState.currentRowIndex;

export const selectToasts = (state) => state.gameState.toasts;

export default gameStateSlice.reducer;