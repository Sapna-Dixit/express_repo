import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  signTestData: [],
  particularSignTestData: [],
};

const signTestSlice = createSlice({
  name: 'signTest',
  initialState,
  reducers: {
    getAllSignTest(state, action) {
      state.signTestData = action.payload;
    },
    getParticularSignTest(state, action) {
      state.particularSignTestData = action.payload;
    },
  },
});

export const { getAllSignTest, getParticularSignTest } = signTestSlice.actions;
export default signTestSlice.reducer;