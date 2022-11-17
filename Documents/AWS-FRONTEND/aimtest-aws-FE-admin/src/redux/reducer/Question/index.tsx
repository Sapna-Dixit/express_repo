import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  questionData: [],
  particularQuestionData: [],
};

const questionSlice = createSlice({
  name: 'question ',
  initialState,
  reducers: {
    getAllQuestion(state, action) {
      state.questionData = action.payload;
    },
    getParticularQuestion(state, action) {
      state.particularQuestionData = action.payload;
    },
  },
});

export const { getAllQuestion, getParticularQuestion } = questionSlice.actions;
export default questionSlice.reducer;
