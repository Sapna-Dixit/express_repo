import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  wordTestData: [],
  particularWordTestData: [],
};

const wordTestSlice = createSlice({
  name: 'wordTest',
  initialState,
  reducers: {
    getAllWordTest(state, action) {
      state.wordTestData = action.payload;
    },
    getParticularWordTest(state, action) {
      state.particularWordTestData = action.payload;
    },
  },
});

export const { getAllWordTest, getParticularWordTest } = wordTestSlice.actions;
export default wordTestSlice.reducer;
