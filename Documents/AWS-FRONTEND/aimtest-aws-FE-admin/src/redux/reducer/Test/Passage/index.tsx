import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  passageData: [],
  particularPassageData: [],
};

const passageSlice = createSlice({
  name: 'passage',
  initialState,
  reducers: {
    getAllPassage(state, action) {
      state.passageData = action.payload;
    },
    getParticularPassage(state, action) {
      state.particularPassageData = action.payload;
    },
  },
});

export const { getAllPassage, getParticularPassage } = passageSlice.actions;
export default passageSlice.reducer;
