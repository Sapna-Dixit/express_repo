import { createSlice } from '@reduxjs/toolkit';
const initialState: userState = {
  userData: [],
  particularUserData: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getAllUser(state, action) {
      state.userData = action.payload;
    },
    getParticularUser(state, action) {
      state.particularUserData = action.payload;
    },
  },
});

export const { getAllUser, getParticularUser} = userSlice.actions;
export default userSlice.reducer;
