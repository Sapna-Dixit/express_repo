import { createSlice } from '@reduxjs/toolkit';
const initialState: segmentState = {
  segmentData: [],
  particularSegmentData: [],
};

const segmentSlice = createSlice({
  name: 'segment',
  initialState,
  reducers: {
    getAllSegment(state, action) {
      state.segmentData = action.payload;
    },
    getParticularSegment(state, action) {
      state.particularSegmentData = action.payload;
    },
  },
});

export const { getAllSegment, getParticularSegment } = segmentSlice.actions;
export default segmentSlice.reducer;
