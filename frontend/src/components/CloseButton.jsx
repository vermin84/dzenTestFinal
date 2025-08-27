import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./CloseButton.module.css";

export default function CloseButton({ onCancel }) {
  return (
    <button className={styles.closeButton} onClick={onCancel}>
      <FontAwesomeIcon icon={faTimes} />
    </button>
  );
}
