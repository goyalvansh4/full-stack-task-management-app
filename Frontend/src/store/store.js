// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./menu/menuSlice";
import cartReducer from "./cart/cartSlice";
import orderReducer from "./order/orderSlice";
import userReducer from "./user/userSlice";

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    cart: cartReducer,
    order: orderReducer,
    user: userReducer,
  },
});
