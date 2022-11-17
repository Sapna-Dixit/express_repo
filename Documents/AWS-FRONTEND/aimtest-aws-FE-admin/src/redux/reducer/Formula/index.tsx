import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  formulaData: [],
};

const formulaSlice = createSlice({
  name: 'formula ',
  initialState,
  reducers: {
    getAllFormula(state, action) {
      state.formulaData = action.payload;
    },
  },
});

export const { getAllFormula } = formulaSlice.actions;
export default formulaSlice.reducer;
