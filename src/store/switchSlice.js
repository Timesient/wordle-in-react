import { createSlice } from '@reduxjs/toolkit';

/* check if it is system in dark theme */
const isSystemDarkTheme = window?.matchMedia('(prefers-color-scheme: dark)').matches;
if (window.localStorage['wordle-isDarkTheme'] === undefined) {
  window.localStorage.setItem('wordle-isDarkTheme', isSystemDarkTheme);
}


/* initial */
const initialState = {
  isNavModalShowing: false,
  isInstructionPageShowing: false,
  isInstructionModalShowing: false,
  isStatisticModalShowing: false,
  isSettingPageShowing: false,

  isDarkTheme: JSON.parse(window.localStorage['wordle-isDarkTheme'] === 'true'),
  isHighContrastMode: JSON.parse(window.localStorage['wordle-isHighContrastMode'] === 'true')
};


/* slice definition */
export const switchSlice = createSlice({
  name: 'switch',
  initialState,
  reducers: {
    setIsNavModalShowing: (state, action) => {
      state.isNavModalShowing  = action.payload;
    },
    setIsInstructionPageShowing: (state, action) => {
      state.isInstructionPageShowing  = action.payload;
    },
    setIsInstructionModalShowing: (state, action) => {
      state.isInstructionModalShowing  = action.payload;
    },
    setIsStatisticModalShowing: (state, action) => {
      state.isStatisticModalShowing  = action.payload;
    },
    setIsSettingPageShowing: (state, action) => {
      state.isSettingPageShowing  = action.payload;
    },
    setIsDarkTheme: (state, action) => {
      state.isDarkTheme = action.payload;
      window.localStorage.setItem('wordle-isDarkTheme', action.payload);
    },
    setIsHighContrastMode: (state, action) => {
      state.isHighContrastMode = action.payload;
      window.localStorage.setItem('wordle-isHighContrastMode', action.payload);
    }
  }
});


/* exports */
export const {
  setIsNavModalShowing,
  setIsInstructionPageShowing,
  setIsInstructionModalShowing,
  setIsStatisticModalShowing,
  setIsSettingPageShowing,
  setIsDarkTheme,
  setIsHighContrastMode,
} = switchSlice.actions;

export const selectIsNavModalShowing = (state) => state.switch.isNavModalShowing;

export const selectIsInstructionPageShowing = (state) => state.switch.isInstructionPageShowing;

export const selectIsInstructionModalShowing = (state) => state.switch.isInstructionModalShowing;

export const selectIsStatisticModalShowing = (state) => state.switch.isStatisticModalShowing;

export const selectIsSettingPageShowing = (state) => state.switch.isSettingPageShowing;

export const selectIsDarkTheme = (state) => state.switch.isDarkTheme;

export const selectIsHighContrastMode = (state) => state.switch.isHighContrastMode;

export default switchSlice.reducer;
