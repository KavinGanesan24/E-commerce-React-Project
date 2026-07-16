import { createSlice } from "@reduxjs/toolkit";

const buyNowSlice = createSlice({
  name: "buyNow",

  initialState: {
    product: null,
  },

  reducers: {
    setBuyNowProduct(state, action) {
      state.product = action.payload;
    },

    clearBuyNowProduct(state) {
      state.product = null;
    },
  },
});

export const {
  setBuyNowProduct,
  clearBuyNowProduct,
} = buyNowSlice.actions;

export default buyNowSlice.reducer;