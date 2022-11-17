import { createSlice } from '@reduxjs/toolkit';
const initialState: sectionState = {
  sectionData: [],
  particularSectionData: [],
};

const sectionSlice = createSlice({
  name: 'section',
  initialState,
  reducers: {
    getAllSection(state, action) {
      state.sectionData = action.payload;
    },
    getParticularSection(state, action) {
      state.particularSectionData = action.payload;
    },
  },
});

export const { getAllSection, getParticularSection } = sectionSlice.actions;
export default sectionSlice.reducer;
