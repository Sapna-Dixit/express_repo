import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  imageTestLevelData: [],
  particularImageTestLevelData: [],
};

const imageTestLevelSlice = createSlice({
  name: 'imageTestLevel',
  initialState,
  reducers: {
    getAllImageTestLevel(state, action) {
      state.imageTestLevelData = action.payload;
    },
    getParticularImageTestLevel(state, action) {
      state.particularImageTestLevelData = action.payload;
    },
  },
});

export const { getAllImageTestLevel, getParticularImageTestLevel } =
  imageTestLevelSlice.actions;
export default imageTestLevelSlice.reducer;
