import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  signTestLevelData: [],
  particularSignTestLevelData: [],
};

const signTestLevelSlice = createSlice({
  name: 'signTestLevel',
  initialState,
  reducers: {
    getAllSignTestLevel(state, action) {
      state.signTestLevelData = action.payload;
    },
    getParticularSignTestLevel(state, action) {
      state.particularSignTestLevelData = action.payload;
    },
  },
});

export const { getAllSignTestLevel, getParticularSignTestLevel } =
  signTestLevelSlice.actions;
export default signTestLevelSlice.reducer;
