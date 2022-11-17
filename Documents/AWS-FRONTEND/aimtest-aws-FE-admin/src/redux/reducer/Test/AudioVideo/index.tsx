import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  audioVideoTestData: [],
  particularAudioVideoTestData: [],
};

const audioVideoTestSlice = createSlice({
  name: 'audioVideoTest',
  initialState,
  reducers: {
    getAllAudioVideoTest(state, action) {
      state.audioVideoTestData = action.payload;
    },
    getParticularAudioVideoTest(state, action) {
      state.particularAudioVideoTestData = action.payload;
    },
  },
});

export const { getAllAudioVideoTest, getParticularAudioVideoTest } =
  audioVideoTestSlice.actions;
export default audioVideoTestSlice.reducer;
