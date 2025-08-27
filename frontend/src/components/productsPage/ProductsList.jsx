import { useSelector } from "react-redux";
import Product from "./Product";
import styles from "./ProductList.module.css";
import { selectFilteredProducts } from "../../store/selectors";
import ProductsFilter from "./ProductsFilter";
export default function ProductsList() {
  const products = useSelector(selectFilteredProducts);
  return (
    <>
      <ProductsFilter />
      <div className={styles.productListWrapper}>
        {products.map((item) => (
          <Product key={item.id} product={item} />
        ))}
      </div>
    </>
  );
}
