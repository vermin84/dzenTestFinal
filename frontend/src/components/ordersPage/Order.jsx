import { useState } from "react";
import Date from "../Date";

import styles from "./Order.module.css";
import OrderPrice from "./OrderPrice";
import Modal from "../modal/Modal";
import { useDispatch } from "react-redux";
import { deleteOrder, removeOrder } from "../../store/orderSlice";
import DeleteButton from "../DeleteButton";

export default function Order({ order, onClick }) {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  function deleteHandler(e) {
    e.stopPropagation();
    setShowModal(true);
  }

  const confirmDeleteHandler = (id) => {
    dispatch(deleteOrder(id));
    
    setShowModal(false);
  };
  function cancelHandler() {
    setShowModal(false);
  }
  const uahPrice = order.products.reduce((sum, product) => {
    const price = product.price.find((p) => p.symbol === "UAH");
    return (sum += price ? price.value : 0);
  }, 0);

  const usdPrice = order.products.reduce((sum, product) => {
    const price = product.price.find((p) => p.symbol === "USD");
    return (sum += price ? price.value : 0);
  }, 0);
  const orderPrice = {
    UAH: uahPrice,
    USD: usdPrice,
  };

  return (
    <div onClick={() => onClick(order)} className={styles.orderWrapper}>
      <p className={styles.orderTitle}>{order.title}</p>
      <div className={styles.orderDetails}>
        <span>{order.products.length}</span>
        <span className={styles.orderDetailsBottom}>
          {order.products.length > 1 ? "Products" : "Product"}
        </span>
      </div>
      {<Date date={order.date} />}
      <OrderPrice price={orderPrice} />
      <DeleteButton
        onDelete={(e) => {
          e.stopPropagation();
          deleteHandler(e);
        }}
      />
      {showModal && (
        <Modal
          title={order.title}
          onConfirm={() => confirmDeleteHandler(order.id)}
          onCancel={cancelHandler}
        />
      )}
    </div>
  );
}
