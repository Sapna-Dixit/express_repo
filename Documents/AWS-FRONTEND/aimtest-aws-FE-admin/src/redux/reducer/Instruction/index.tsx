import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  instructionData: [],
};

const instructionSlice = createSlice({
  name: 'instruction',
  initialState,
  reducers: {
    getAllInstructions(state, action) {
      state.instructionData = action.payload;
    },
  },
});

export const { getAllInstructions } = instructionSlice.actions;
export default instructionSlice.reducer;
