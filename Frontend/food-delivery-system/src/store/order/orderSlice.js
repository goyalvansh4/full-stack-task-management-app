// src/features/order/orderSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import GlobalAxios from "../../Global/GlobalAxios";
import Cookies from "js-cookie";


export const getOrders = createAsyncThunk("order/getOrders", async () => {
  const response = await GlobalAxios.get("/orders");
  console.log(response.data);
  return response.data;
});

export const createOrder = createAsyncThunk("order/createOrder", async ({
  cartItemIds,totalAmount,status
}) => {
  console.log(cartItemIds,totalAmount,status);
  let order = {
    userId: Cookies.get("userId"),
    items:cartItemIds,
    totalAmount:totalAmount,
    status:status
  }
const response = await GlobalAxios.post("/orders", order);
return response.data;
});


const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    status: "idle", // "idle", "loading", "succeeded", "failed"
    error: null,
  },
  reducers: {
    fetchOders: (state, action) => {
      let data = getOrders();
      state.orders.push(data);
    },
    placeOrder: (state, action) => {
      state.orders.push(action.payload);
    }
  },
});

export const { fetchOders,placeOrder } = orderSlice.actions;
export default orderSlice.reducer;
