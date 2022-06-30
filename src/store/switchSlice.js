import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isNavModalShowing: false,
  isInstructionPageShowing: false,
  isInstructionModalShowing: false,
  isSettingPageShowing: false,

  isDarkTheme: false,
  isHighContrastMode: false,
};

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
    setIsSettingPageShowing: (state, action) => {
      state.isSettingPageShowing  = action.payload;
    },
    setIsDarkTheme: (state, action) => {
      state.isDarkTheme = action.payload;
    },
    setIsHighContrastMode: (state, action) => {
      state.isHighContrastMode = action.payload;
    }
  }
});

export const {
  setIsNavModalShowing,
  setIsInstructionPageShowing,
  setIsInstructionModalShowing,
  setIsSettingPageShowing,
  setIsDarkTheme,
  setIsHighContrastMode,
} = switchSlice.actions;

export const selectIsNavModalShowing = (state) => state.switch.isNavModalShowing;

export const selectIsInstructionPageShowing = (state) => state.switch.isInstructionPageShowing;

export const selectIsInstructionModalShowing = (state) => state.switch.isInstructionModalShowing;

export const selectIsSettingPageShowing = (state) => state.switch.isSettingPageShowing;

export const selectIsDarkTheme = (state) => state.switch.isDarkTheme;

export const selectIsHighContrastMode = (state) => state.switch.isHighContrastMode;

export default switchSlice.reducer;
