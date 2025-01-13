// cartSlice.js (Redux Store)

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // The array will store cart items with properties: id, name, price, quantity, description
  itemIds: [], // The array will store only the ids of the items in the cart
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let obj = {
        menuItemId: action.payload._id,
        quantity: 1,
      }
      state.itemIds.push(obj);
      const existingItem = state.items.find(item => item._id === action.payload._id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload);
      state.itemIds = state.itemIds.filter(item => item.menuItemId !== action.payload);
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find(item => item._id === action.payload);
      if (item) item.quantity += 1;
      const obj = state.itemIds.find(item => item.menuItemId === action.payload);
      if (obj) obj.quantity += 1;
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find(item => item._id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
      const obj = state.itemIds.find(item => item.menuItemId === action.payload);
      if (obj && obj.quantity > 1) obj.quantity -= 1;
    },
    clearCart: (state) => {
      state.items = [];
      state.itemIds = [];
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
