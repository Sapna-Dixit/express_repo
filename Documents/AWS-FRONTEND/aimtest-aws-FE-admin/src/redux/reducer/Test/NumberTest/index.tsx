import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  numberTestData: [],
  particularNumberTestData: [],
};

const numberTestSlice = createSlice({
  name: 'numberTest',
  initialState,
  reducers: {
    getAllNumberTest(state, action) {
      state.numberTestData = action.payload;
    },
    getParticularNumberTest(state, action) {
      state.particularNumberTestData = action.payload;
    },
  },
});

export const { getAllNumberTest, getParticularNumberTest } = numberTestSlice.actions;
export default numberTestSlice.reducer;
