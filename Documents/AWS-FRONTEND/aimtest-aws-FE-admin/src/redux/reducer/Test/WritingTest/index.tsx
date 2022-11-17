import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  writingTestData: [],
  particularWritingTestData: [],
};

const writingTestSlice = createSlice({
  name: 'writingTest',
  initialState,
  reducers: {
    getAllWritingTest(state, action) {
      state.writingTestData = action.payload;
    },
    getParticularWritingTest(state, action) {
      state.particularWritingTestData = action.payload;
    },
  },
});

export const { getAllWritingTest, getParticularWritingTest } =
  writingTestSlice.actions;
export default writingTestSlice.reducer;
