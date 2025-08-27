import styles from "./OrderPrice.module.css";
export default function OrderPrice({ price }) {
  return (
    <div className={styles.orderPriceWrapper}>
      <span className={styles.orderPriceSecondary}>{price.USD} USD</span>
      <span className={styles.orderPriceMain}>{price.UAH} UAH</span>
    </div>
  );
}
