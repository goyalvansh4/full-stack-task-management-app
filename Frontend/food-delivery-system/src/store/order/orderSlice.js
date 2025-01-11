// src/features/order/orderSlice.js
import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    status: "idle", // "idle", "loading", "succeeded", "failed"
    error: null,
  },
  reducers: {
    placeOrder: (state, action) => {
      state.orders.push(action.payload);
    }
  },
});

export const { placeOrder } = orderSlice.actions;
export default orderSlice.reducer;
