import ProductsList from "../components/productsPage/ProductsList";
import styles from "./Products.module.css";
export default function Products() {
  return (
    <div className={styles.productsWrapper}>
      <ProductsList />
    </div>
  );
}
