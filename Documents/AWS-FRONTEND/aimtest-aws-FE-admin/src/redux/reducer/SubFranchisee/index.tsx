import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  subFranchiseeData: [],
  particularSubFranchiseeData: [],
};

const subFranchiseeSlice = createSlice({
  name: 'subFranchisee ',
  initialState,
  reducers: {
    getAllSubFranchisee(state, action) {
      state.subFranchiseeData = action.payload;
    },
    getParticularSubFranchisee(state, action) {
      state.particularSubFranchiseeData = action.payload;
    },
  },
});

export const { getAllSubFranchisee, getParticularSubFranchisee } =
  subFranchiseeSlice.actions;
export default subFranchiseeSlice.reducer;
