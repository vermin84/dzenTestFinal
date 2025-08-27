import styles from "./Logo.module.css";

export default function Logo() {
  return (
    <div className={styles.logoWrapper}>
      <div className={styles.logoImageWrapper}>
        <img className={styles.logoImage} src="/logo.png" alt="logo" />
      </div>
      <span className={styles.logoTitle}>inventory</span>
    </div>
  );
}
