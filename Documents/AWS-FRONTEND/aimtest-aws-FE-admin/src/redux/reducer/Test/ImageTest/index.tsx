import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  imageTestData: [],
  particularImageTestData: [],
};

const imageTestSlice = createSlice({
  name: 'imageTest',
  initialState,
  reducers: {
    getAllImageTest(state, action) {
      state.imageTestData = action.payload;
    },
    getParticularImageTest(state, action) {
      state.particularImageTestData = action.payload;
    },
  },
});

export const { getAllImageTest, getParticularImageTest } =
  imageTestSlice.actions;
export default imageTestSlice.reducer;
