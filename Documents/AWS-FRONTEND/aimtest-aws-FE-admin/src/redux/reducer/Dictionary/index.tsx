import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  dictionaryData: [],
  particularDictionaryData: [],
};

const dictionarySlice = createSlice({
  name: 'dictionary',
  initialState,
  reducers: {
    getAllDictionary(state, action) {
      state.dictionaryData = action.payload;
    },
    getParticularDictionary(state, action) {
      state.particularDictionaryData = action.payload;
    },
  },
});

export const { getAllDictionary, getParticularDictionary } =
dictionarySlice.actions;
export default dictionarySlice.reducer;
