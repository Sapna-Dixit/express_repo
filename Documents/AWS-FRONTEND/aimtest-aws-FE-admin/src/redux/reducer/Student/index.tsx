import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  studentData: [],
  studentExam: [],
  studentExamQuestions: [],
  studentExamTest: [],
  particularStudentData: [],
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    getAllStudent(state, action) {
      state.studentData = action.payload;
    },
    getParticularStudent(state, action) {
      state.particularStudentData = action.payload;
    },
    studentExams(state, action) {
      state.studentExam = action.payload;
    },
    getStudentExamQuestions(state, action) {
      state.studentExamQuestions = action.payload;
    },
    getStudentExamTest(state, action) {
      state.studentExamTest = action.payload;
    },
  },
});

export const {
  getAllStudent,
  getParticularStudent,
  studentExams,
  getStudentExamQuestions,
  getStudentExamTest,
} = studentSlice.actions;
export default studentSlice.reducer;
