import { useEffect, useState } from "react";
import styles from "./HeaderTimer.module.css";
import { FaClock } from "react-icons/fa";
export default function HeaderTimer() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const today = now.toLocaleDateString("ru-RU", { weekday: "long" });
  const formatedDate = now.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formatedTime = now.toLocaleTimeString();

  return (
    <div className={styles.headerTimerWrapper}>
      <div className={styles.headerTimerDateWrapper}>
        <span className={styles.headerTimerDateDay}>{today}</span>
        <span className={styles.headerTimerDateValue}>{formatedDate}</span>
      </div>
      <div className={styles.headerTimerClock}>
        {" "}
        <FaClock style={{ color: "var(--green) " }} />
        {formatedTime}
      </div>
    </div>
  );
}
