import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  wordTestLevelData: [],
  particularWordTestLevelData: [],
};

const wordTestLevelSlice = createSlice({
  name: 'wordTestLevel',
  initialState,
  reducers: {
    getAllWordTestLevel(state, action) {
      state.wordTestLevelData = action.payload;
    },
    getParticularWordTestLevel(state, action) {
      state.particularWordTestLevelData = action.payload;
    },
  },
});

export const { getAllWordTestLevel, getParticularWordTestLevel } =
  wordTestLevelSlice.actions;
export default wordTestLevelSlice.reducer;
