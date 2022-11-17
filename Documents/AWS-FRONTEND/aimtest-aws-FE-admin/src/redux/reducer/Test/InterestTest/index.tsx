import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  interestTestData: [],
  particularInterestTestData: [],
};

const interestTestSlice = createSlice({
  name: 'interestTest',
  initialState,
  reducers: {
    getAllInterestTest(state, action) {
      state.interestTestData = action.payload;
    },
    getParticularInterestTest(state, action) {
      state.particularInterestTestData = action.payload;
    },
  },
});

export const { getAllInterestTest, getParticularInterestTest } = interestTestSlice.actions;
export default interestTestSlice.reducer;
