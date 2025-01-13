// src/features/order/orderSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import GlobalAxios from "../../Global/GlobalAxios";


export const getOrders = createAsyncThunk("order/getOrders", async () => {
  const response = await GlobalAxios.get("/orders");
  return response.data;
});

export const createOrder = createAsyncThunk("order/createOrder", async (order) => {
  const response = await GlobalAxios.post("/orders", order);
  return response.data;
});

export const updateOrder = createAsyncThunk("order/updateOrder", async (id, order) => {
  const response = await GlobalAxios.put(`/orders/${id}`, order);
  return response.data;
});

export const deleteOrder = createAsyncThunk("order/deleteOrder", async (id) => {
  const response = await GlobalAxios.delete(`/orders/${id}`);
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
    placeOrder: (state, action) => {
      state.orders.push(action.payload);
    }
  },
});

export const { placeOrder } = orderSlice.actions;
export default orderSlice.reducer;
