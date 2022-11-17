import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  examData: [],
  particularExamData: [],
};

const examSlice = createSlice({
  name: 'exam ',
  initialState,
  reducers: {
    getAllExam(state, action) {
      state.examData = action.payload;
    },
    getParticularExam(state, action) {
      state.particularExamData = action.payload;
    },
  },
});

export const { getAllExam, getParticularExam } = examSlice.actions;
export default examSlice.reducer;
