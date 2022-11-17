import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  numberTestLevelData: [],
  particularNumberTestLevelData: [],
};

const numberTestLevelSlice = createSlice({
  name: 'numberTestLevel',
  initialState,
  reducers: {
    getAllNumberTestLevel(state, action) {
      state.numberTestLevelData = action.payload;
    },
    getParticularNumberTestLevel(state, action) {
      state.particularNumberTestLevelData = action.payload;
    },
  },
});

export const { getAllNumberTestLevel, getParticularNumberTestLevel } =
  numberTestLevelSlice.actions;
export default numberTestLevelSlice.reducer;
