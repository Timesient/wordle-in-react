import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isNavModalShowing: false,
  isInstructionPageShowing: false,
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
    }
  }
});

export const { setIsNavModalShowing, setIsInstructionPageShowing } = switchSlice.actions;

export const selectIsNavModalShowing = (state) => state.switch.isNavModalShowing;

export const selectIsInstructionPageShowing = (state) => state.switch.isInstructionPageShowing;

export default switchSlice.reducer;
