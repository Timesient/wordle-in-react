import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isNavModalShowing: false
};

export const switchSlice = createSlice({
  name: 'switch',
  initialState,
  reducers: {
    setIsNavModalShowing: (state, action) => {
      state.isNavModalShowing  = action.payload;
    }
  }
});

export const { setIsNavModalShowing } = switchSlice.actions;

export const selectIsNavModalShowing = (state) => state.switch.isNavModalShowing;

export default switchSlice.reducer;
