import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  couponData: [],
  particularCouponData: [],
};

const couponSlice = createSlice({
  name: 'coupon',
  initialState,
  reducers: {
    getAllCoupons(state, action) {
      state.couponData = action.payload;
    },
    getParticularCoupon(state, action) {
      state.particularCouponData = action.payload;
    },
  },
});

export const { getAllCoupons, getParticularCoupon } = couponSlice.actions;
export default couponSlice.reducer;
