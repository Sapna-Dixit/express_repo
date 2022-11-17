import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  studentFranchiseeData: [],
  particularStudentFranchiseeData: [],
};

const studentFranchiseeSlice = createSlice({
  name: 'studentFranchisee ',
  initialState,
  reducers: {
    getAllStudentFranchisee(state, action) {
      state.studentFranchiseeData = action.payload;
    },
    getParticularStudentFranchisee(state, action) {
      state.particularStudentFranchiseeData = action.payload;
    },
  },
});

export const { getAllStudentFranchisee, getParticularStudentFranchisee } =
  studentFranchiseeSlice.actions;
export default studentFranchiseeSlice.reducer;
