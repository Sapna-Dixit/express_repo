import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  sideBar: true,
};

const sideBarSlice = createSlice({
  name: 'sideBar',
  initialState,
  reducers: {
    sideBar(state, action) {
      state.sideBar = action.payload;
    },
  },
});

export const { sideBar } = sideBarSlice.actions;
export default sideBarSlice.reducer;
