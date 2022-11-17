import { createSlice } from '@reduxjs/toolkit';
const initialState: elementState = {
  elementData: [],
  particularElementData: [],
};

const elementSlice = createSlice({
  name: 'element',
  initialState,
  reducers: {
    getAllElement(state, action) {
      state.elementData = action.payload;
    },
    getParticularElement(state, action) {
      state.particularElementData = action.payload;
    }
  },
});

export const { getAllElement, getParticularElement } =
  elementSlice.actions;
export default elementSlice.reducer;
