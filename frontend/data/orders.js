import { products } from "./products";

export const orders = [
  {
    id: 1,
    title: "Order 1",
    date: "2017-06-29 12:09:33",
    description: "desc",
    products: products.filter((p) => p.order === 1),
  },
  {
    id: 2,
    title: "Order 2",
    date: "2017-06-29 12:09:33",
    description: "desc",
    products: products.filter((p) => p.order === 2),
  },
  {
    id: 3,
    title: "Order 3",
    date: "2017-06-29 12:09:33",
    description: "desc",
    products: products.filter((p) => p.order === 3),
  },
];
