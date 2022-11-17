import { createSlice } from '@reduxjs/toolkit';
const initialState: loaderState = {
  loader: false,
};

const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    loader(state, action) {
      state.loader = action.payload;
    },
  },
});

export const { loader } = loaderSlice.actions;
export default loaderSlice.reducer;
