import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isNavModalShowing: false,
  isInstructionPageShowing: false,
  isInstructionModalShowing: true
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
    }
  }
});

export const { setIsNavModalShowing, setIsInstructionPageShowing, setIsInstructionModalShowing } = switchSlice.actions;

export const selectIsNavModalShowing = (state) => state.switch.isNavModalShowing;

export const selectIsInstructionPageShowing = (state) => state.switch.isInstructionPageShowing;

export const selectIsInstructionModalShowing = (state) => state.switch.isInstructionModalShowing;


export default switchSlice.reducer;
