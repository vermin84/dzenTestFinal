import styles from "./ProductTitle.module.css";
export default function ProductTitle({ title, serialNumber }) {
  return (
    <div className={styles.productTitleWrapper}>
      <span className={styles.productTitleValue}>{title}</span>
      <span className={styles.productTitleSerial}>SN: {serialNumber}</span>
    </div>
  );
}
