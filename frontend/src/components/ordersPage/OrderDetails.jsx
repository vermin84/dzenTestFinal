import ProductShort from "./ProductShort";
import styles from "./OrderDetails.module.css";
import CloseButton from "../CloseButton";
export default function OrderDetails({ order, onClose }) {
  return (
    <div className={styles.orderDetailsWrapper}>
      <div className={styles.orderDetailsContainer}>
        <CloseButton onCancel={onClose} />

        <h3 className={styles.orderDetailsTitle}>{order.title}</h3>
        {order.products.length > 0 && (
          <ul>
            {order.products.map((prod) => (
              <ProductShort key={prod.id} product={prod} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
