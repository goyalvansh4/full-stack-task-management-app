// src/features/order/orderSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import GlobalAxios from "../../Global/GlobalAxios";
import Cookies from "js-cookie";

// Initial state for orders
const initialState = {
  orders: [], // Stores fetched orders
  status: "idle", // Tracks the status: "idle", "loading", "succeeded", "failed"
  error: null, // Stores any errors that occur
};

// Async thunk to fetch orders
export const getOrders = createAsyncThunk("order/getOrders", async (_, { rejectWithValue }) => {
  try {
    const response = await GlobalAxios.get("/orders"); // API call to fetch orders
    console.log("Get Orders:", response.data.orders);
    return response.data.orders; // Return the orders array
  } catch (error) {
    console.error("Failed to fetch orders:", error.response?.data?.message || error.message);
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

// Async thunk to create an order
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async ({ cartItemIds, totalAmount, status }, { rejectWithValue }) => {
    try {
      console.log("Creating Order:", cartItemIds, totalAmount, status);
      const userId = Cookies.get("userId"); // Get user ID from cookies
      const order = {
        userId,
        items: cartItemIds,
        totalAmount,
        status,
      };
      const response = await GlobalAxios.post("/orders", order); // API call to create order
      return response.data; // Return created order data
    } catch (error) {
      console.error("Failed to create order:", error.response?.data?.message || error.message);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Order slice
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    // Optional: Add reducers here for synchronous operations, if needed
  },
  extraReducers: (builder) => {
    // Handle getOrders
    builder
      .addCase(getOrders.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload; // Populate the orders array
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Store the error message
      });

    // Handle createOrder
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders.push(action.payload); // Add the new order to the orders array
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Store the error message
      });
  },
});

// Export the reducer
export default orderSlice.reducer;
