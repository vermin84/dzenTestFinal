import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
import CloseButton from "../CloseButton";

export default function Modal({ onCancel, onConfirm, title }) {
  return createPortal(
    <div className={styles.modalWrapper} onClick={onCancel}>
      <div className={styles.modalMenu} onClick={(e) => e.stopPropagation()}>
        <CloseButton onCancel={onCancel} />
        <h3>{`Do you want remove ${title}`}</h3>
        <div className={styles.modalButtons}>
          <button onClick={onCancel} className={styles.modalCancelBtn}>
            Cancel
          </button>
          <button onClick={onConfirm} className={styles.modalDeleteBtn}>
            Delete
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
