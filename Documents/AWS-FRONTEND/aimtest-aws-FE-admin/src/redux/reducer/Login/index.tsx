import { createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
const initialState = {
  loginData: '',
  userData: [],
  userRole: 0,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login(state, action) {
      state.loginData = action.payload;
    },
    userRole(state, action) {
      state.userRole = action.payload;
    },
    resetLogin() {
      storage.removeItem('persist:root');
    },
    userProfileData(state, action) {
      state.userData = action.payload;
    },
  },
});
export const { login, resetLogin, userProfileData, userRole } =
  loginSlice.actions;
export default loginSlice.reducer;
