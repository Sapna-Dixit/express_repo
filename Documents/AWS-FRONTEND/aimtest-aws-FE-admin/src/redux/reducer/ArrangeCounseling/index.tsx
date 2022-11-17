import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  arrangeCounselingData: [],
};

const arrangeCounselingSlice = createSlice({
  name: 'arrangeCounseling',
  initialState,
  reducers: {
    getAllArrangeCounseling(state, action) {
      state.arrangeCounselingData = action.payload;
    },
  },
});

export const { getAllArrangeCounseling } = arrangeCounselingSlice.actions;
export default arrangeCounselingSlice.reducer;
