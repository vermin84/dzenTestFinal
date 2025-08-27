import { createSlice } from "@reduxjs/toolkit";
import { products } from "../../data/products";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    list: products,
    filterType: "All",
  },
  reducers: {
    addProduct: (state, action) => {
      state.list.push(action.payload);
    },
    removeProduct: (state, action) => {
      state.list = state.list.filter(
        (product) => product.id !== action.payload,
      );
    },
    setFilterType: (state, action) => {
      state.filterType = action.payload;
    },
  },
});

export const { addProduct, removeProduct, setFilterType } =
  productsSlice.actions;






export default productsSlice.reducer;
