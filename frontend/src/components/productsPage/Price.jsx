import styles from "./Price.module.css";

export default function price({ price }) {
  return (
    <div
      className={`${styles.priceWrapper} ${price.isDefault === 0 ? styles.secondary : ""}`}
    >
      <span>{price.value}</span>
      <span>{price.symbol}</span>
    </div>
  );
}
