import styles from "./Guarantee.module.css";
export default function Guarantee({ dates }) {
  return (
    <div className={styles.guaranteeWrapper}>
      <span>c {dates.start.replace(/-/g, "/")}</span>
      <span>по {dates.end.replace(/-/g, "/")}</span>
    </div>
  );
}
