import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  franchiseeData: [],
  particularFranchiseeData: [],
};

const franchiseeSlice = createSlice({
  name: 'franchisee ',
  initialState,
  reducers: {
    getAllfranchisee(state, action) {
      state.franchiseeData = action.payload;
    },
    getParticularFranchisee(state, action) {
      state.particularFranchiseeData = action.payload;
    },
  },
});

export const { getAllfranchisee, getParticularFranchisee } =
  franchiseeSlice.actions;
export default franchiseeSlice.reducer;
