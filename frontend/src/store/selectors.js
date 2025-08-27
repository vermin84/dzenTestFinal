import { createSelector } from "@reduxjs/toolkit";

export const selectOrders = (state) => state.orders.list;

export const selectProductsList = (state) => state.products.list;

export const selectFilterType = (state) => state.products.filterType;

export const selectProductTypes = createSelector(
  [selectProductsList],
  (products) => ["All", ...Array.from(new Set(products.map((p) => p.type)))],
);

export const selectFilteredProducts = createSelector(
  [selectProductsList, selectFilterType],
  (products, filterType) => {
    if (filterType === "All") return products;
    return products.filter((p) => p.type === filterType);
  },
);

export const selectProductsByOrderId = (orderId) =>
  createSelector([selectProductsList], (products) =>
    products.filter((p) => p.order === orderId),
  );
