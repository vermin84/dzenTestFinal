import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "./DeleteButton.module.css";

export default function DeleteButton({ onDelete }) {
  return (
    <button className={styles.deleteBtn} onClick={onDelete}>
      <FontAwesomeIcon icon={faTrash} />
    </button>
  );
}
