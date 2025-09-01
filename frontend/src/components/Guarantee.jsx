import styles from "./Guarantee.module.css";
export default function Guarantee({ dates }) {
  return (
    <div className={styles.guaranteeWrapper}>
      <span>c {new Date(dates.start).toLocaleDateString("en-GB")}</span>
      <span>по {new Date(dates.end).toLocaleDateString("en-GB")}</span>
    </div>
  );
}
