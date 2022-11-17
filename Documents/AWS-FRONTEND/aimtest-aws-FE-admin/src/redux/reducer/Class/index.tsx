import { createSlice } from '@reduxjs/toolkit';
const initialState: classState = {
  classData: [],
  particularClassData: [],
};

const classSlice = createSlice({
  name: 'class',
  initialState,
  reducers: {
    getAllClasses(state, action) {
      state.classData = action.payload;
    },
    getParticularClass(state, action) {
      state.particularClassData = action.payload;
    },
  },
});

export const { getAllClasses, getParticularClass } = classSlice.actions;
export default classSlice.reducer;
