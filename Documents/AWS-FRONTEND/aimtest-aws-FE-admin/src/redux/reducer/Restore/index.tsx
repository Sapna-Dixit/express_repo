import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  restoreId: '',
};

const restoreSlice = createSlice({
  name: 'restore',
  initialState,
  reducers: {
    restoreData(state, action) {
      state.restoreId = action.payload;
    },
  },
});

export const { restoreData } = restoreSlice.actions;
export default restoreSlice.reducer;
