import { useState } from "react";
import DeleteButton from "../DeleteButton";
import ProductTitle from "../productsPage/ProductTitle";
import styles from "./ProductShort.module.css";
import { useDispatch } from "react-redux";
import { removeProduct } from "../../store/productsSlice";
import Modal from "../modal/Modal";
import { removeProductFromOrders } from "../../store/orderSlice";
export default function ProductShort({ product }) {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  function deleteHandler(e) {
    e.stopPropagation();
    setShowModal(true);
  }

  const confirmDeleteHandler = (id) => {
    dispatch(removeProduct(id));
    dispatch(removeProductFromOrders(id));
    setShowModal(false);
  };
  function cancelHandler() {
    setShowModal(false);
  }

  return (
    <li className={styles.productShortWrapper}>
      <ProductTitle title={product.title} serialNumber={product.serialNumber} />
      <span className={styles.productShortStatus}>
        {product.is_new ? "available" : "unavailable"}
      </span>
      <DeleteButton onDelete={deleteHandler} />
      {showModal && (
        <Modal
          title={product.title}
          onConfirm={() => confirmDeleteHandler(product.id)}
          onCancel={cancelHandler}
        />
      )}
    </li>
  );
}
