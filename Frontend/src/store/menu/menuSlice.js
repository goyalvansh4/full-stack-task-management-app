// src/features/menu/menuSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import GlobalAxios from "../../Global/GlobalAxios";

// Async thunk to fetch menu items from the backend
export const fetchMenuItems = createAsyncThunk(
  "menu/fetchMenuItems",
  async () => {
    const response = await GlobalAxios.get("/menus");
    return (Array.isArray(response.data.menuItems) ? response.data.menuItems : []);
  }
);

 export const setMenuItems = createAsyncThunk("menu/setMenuItems", async (items) => {
  const response = await GlobalAxios.post("/menus", items);
  return response.data;
});

export const editMenuItems = createAsyncThunk("menu/editMenuItems", async (id,items) => {
  const response = await GlobalAxios.put(`/menus/${id}`, items);
  return response.data;
});

export const deleteMenuItems = createAsyncThunk("menu/deleteMenuItems", async (id) => {
  const response = await GlobalAxios.delete(`/menus/${id}`);
  return response.data;
});

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    items: [],
    status: "idle", // "idle", "loading", "succeeded", "failed"
    error: null,
  },
  reducers: {
    // Add item to menu
   addMenuItem: (state, action) => {
      state.items.push(action.payload);
    },
    // Update item
    updateMenuItem: (state, action) => {
      const { id, data } = action.payload;
      const index = state.items.findIndex((item) => item._id === id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...data };
      }
    },
    // Remove item
    removeMenuItem: (state, action) => {
      const index = state.items.findIndex((item) => item._id === action.payload);
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMenuItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchMenuItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addMenuItem, updateMenuItem, removeMenuItem } =
  menuSlice.actions;
export default menuSlice.reducer;
