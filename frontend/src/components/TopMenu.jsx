import ActiveSessionsCounter from "./ActiveSessionCounter";
import HeaderTimer from "./HeaderTimer";
import Logo from "./Logo";
import styles from "./TopMenu.module.css";

export default function TopMenu() {
  return (
    <header className={styles.TopMenu}>
      <Logo />
      <div>
        <ActiveSessionsCounter />
        <HeaderTimer />
      </div>
    </header>
  );
}
