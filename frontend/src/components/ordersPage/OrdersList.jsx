import { useSelector } from "react-redux";
import Order from "./Order";
import styles from "./OrdersList.module.css";

export default function OrdersList({ setOrder }) {
  const orders = useSelector((state) => state.orders.list);
  function activeOrderHandler(order) {
    setOrder(order.id);
  }
  return (
    <div className={styles.orderListWrapper}>
      <div className={styles.orderListContainer}>
        {orders.length > 0 ? (
          orders.map((order) => (
            <Order onClick={activeOrderHandler} key={order.id} order={order} />
          ))
        ) : (
          <p>There is no orders Yet</p>
        )}
      </div>
    </div>
  );
}
