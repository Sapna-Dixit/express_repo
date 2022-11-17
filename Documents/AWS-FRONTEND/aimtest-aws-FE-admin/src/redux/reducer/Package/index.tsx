import { createSlice } from '@reduxjs/toolkit';

const packageSlice = createSlice({
  name: 'package',
  initialState: {
    packageData: [],
    particularPackageData: [],
  },
  reducers: {
    getAllPackage(state, action) {
      state.packageData = action.payload;
    },
    getParticularPackage(state, action) {
      state.particularPackageData = action.payload;
    },
  },
});
export const { getAllPackage, getParticularPackage } = packageSlice.actions;
export default packageSlice.reducer;
