import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  calculationTestData: [],
  particularCalculationTestData: [],
};

const calculationTestSlice = createSlice({
  name: 'calculationTest',
  initialState,
  reducers: {
    getAllCalculationTest(state, action) {
      state.calculationTestData = action.payload;
    },
    getParticularCalculationTest(state, action) {
      state.particularCalculationTestData = action.payload;
    },
  },
});

export const { getAllCalculationTest, getParticularCalculationTest } =
  calculationTestSlice.actions;
export default calculationTestSlice.reducer;
