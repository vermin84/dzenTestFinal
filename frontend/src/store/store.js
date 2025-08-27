import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "./orderSlice";
import productsReducer from "./productsSlice";

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
    products: productsReducer,
  },
});
