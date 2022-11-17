import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  calculationTestLevelData: [],
  particularCalculationTestLevelData: [],
};

const calculationTestLevelSlice = createSlice({
  name: 'calculationTestLevel',
  initialState,
  reducers: {
    getAllCalculationTestLevel(state, action) {
      state.calculationTestLevelData = action.payload;
    },
    getParticularCalculationTestLevel(state, action) {
      state.particularCalculationTestLevelData = action.payload;
    },
  },
});

export const { getAllCalculationTestLevel, getParticularCalculationTestLevel } =
  calculationTestLevelSlice.actions;
export default calculationTestLevelSlice.reducer;
