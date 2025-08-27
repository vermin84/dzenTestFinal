import { createSlice } from "@reduxjs/toolkit";
import { orders } from "../../data/orders";
import { removeProduct } from "./productsSlice";

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    list: orders,
  },
  reducers: {
    addOrder: (state, action) => {
      state.list.push(action.payload);
    },
    removeOrder: (state, action) => {
      state.list = state.list.filter((order) => order.id !== action.payload);
    },
    removeProductFromOrders: (state, action) => {
      const productId = action.payload;
      state.list = state.list.map((order) => ({
        ...order,
        products: order.products.filter((product) => product.id !== productId),
      }));
    },
  },
});
export const deleteOrder = (orderId) => (dispatch, getState) => {
  const order = getState().orders.list.find((o) => o.id === orderId);
  if (order) {
    order.products.forEach((product) => {
      dispatch(removeProduct(product.id));
    });
    dispatch(ordersSlice.actions.removeOrder(orderId));
  }
};
export const { addOrder, removeOrder, removeProductFromOrders } =
  ordersSlice.actions;
export default ordersSlice.reducer;
