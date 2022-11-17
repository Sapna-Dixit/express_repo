import { createSlice } from '@reduxjs/toolkit';
const initialState: segmentElementState = {
  segmentElementData: [],
  particularSegmentElementData: [],
};

const segmentElementSlice = createSlice({
  name: 'segmentElement',
  initialState,
  reducers: {
    getAllSegmentElement(state, action) {
      state.segmentElementData = action.payload;
    },
    getParticularSegmentElement(state, action) {
      state.particularSegmentElementData = action.payload;
    },
  },
});

export const { getAllSegmentElement, getParticularSegmentElement } =
  segmentElementSlice.actions;
export default segmentElementSlice.reducer;
