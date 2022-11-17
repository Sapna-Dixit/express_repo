import { createSlice } from '@reduxjs/toolkit';
const initialState: userLevelState = {
  userRoleData: [],
  particularUserRoleData: [],
};

const userRoleSlice = createSlice({
  name: 'userRole',
  initialState,
  reducers: {
    getAllUserRole(state, action) {
      state.userRoleData = action.payload;
    },
    getParticularUserRole(state, action) {
      state.particularUserRoleData = action.payload;
    },
  },
});

export const { getAllUserRole, getParticularUserRole } = userRoleSlice.actions;
export default userRoleSlice.reducer;
