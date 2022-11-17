import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  counselingData: [],
  particularCounselingData: [],
};

const counselingSlice = createSlice({
  name: 'counseling',
  initialState,
  reducers: {
    getAllCounselings(state, action) {
      state.counselingData = action.payload;
    },
    getParticularCounseling(state, action) {
      state.particularCounselingData = action.payload;
    },
  },
});

export const { getAllCounselings, getParticularCounseling } =
  counselingSlice.actions;
export default counselingSlice.reducer;
