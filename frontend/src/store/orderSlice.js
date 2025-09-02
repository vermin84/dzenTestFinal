import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { removeProduct } from "./productsSlice";
import { BASE_URL } from "../../data/url";

// Асинхронный thunk для загрузки заказов с бекенда
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async () => {
    const res = await fetch(`${BASE_URL}/orders-with-products"`);

    //const res = await fetch("https://dzen-backend.onrender.com/orders-with-products");
    if (!res.ok) throw new Error("Failed to fetch orders");
    console.log(res.json())
    return res.json();
  }
);


const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    list: [],
    status: "idle",
    error: null,
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
        products: Array.isArray(order.products)
          ? order.products.filter((product) => product?.id !== productId)
          : [],
      }));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Асинхронный action для удаления заказа с продуктами
export const deleteOrder = (orderId) => (dispatch, getState) => {
  const order = getState().orders.list.find((o) => o.id === orderId);
  if (order && Array.isArray(order.products)) {
    order.products.forEach((product) => {
      if (product?.id) dispatch(removeProduct(product.id));
    });
  }
  dispatch(ordersSlice.actions.removeOrder(orderId));
};

export const { addOrder, removeOrder, removeProductFromOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
