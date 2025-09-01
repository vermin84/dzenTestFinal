import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
   // const res = await fetch("http://localhost:3000/products");
   const res = await fetch("https://dzen-backend.onrender.com/products");
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    list: [],
    filterType: "All",
    status: "idle",
    error: null,
  },
  reducers: {
    addProduct: (state, action) => {
      state.list.push(action.payload);
    },
    removeProduct: (state, action) => {
      state.list = state.list.filter((product) => product.id !== action.payload);
    },
    setFilterType: (state, action) => {
      state.filterType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addProduct, removeProduct, setFilterType } = productsSlice.actions;
export default productsSlice.reducer;
