import styles from "./Date.module.css";
export default function Date({ date }) {
  const [datePart] = date.split(" ");
  const [year, month, day] = datePart.split("-");

  return (
    <div className={styles.dateWrapper}>
      <span className={styles.dateSecondary}>{`${month}/ ${year}`}</span>
      <span>{`${day}/ ${month}/ ${year}`}</span>
    </div>
  );
}
