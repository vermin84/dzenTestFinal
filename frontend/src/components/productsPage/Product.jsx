import { useDispatch, useSelector } from "react-redux";
import DeleteButton from "../DeleteButton";
import Guarantee from "../Guarantee";
import Price from "./Price";
import styles from "./Product.module.css";
import ProductTitle from "./ProductTitle";
import { useState } from "react";
import { removeProduct } from "../../store/productsSlice";
import { removeProductFromOrders } from "../../store/orderSlice";
import Modal from "../modal/Modal";

export default function Product({ product }) {
  const [showModal, setShowModal] = useState(false);
  const orders = useSelector((state) => state.orders.list);
  const productOrders = orders.filter((order) =>
    order.products.some((p) =>
      typeof p === "object" ? p.id === product.id : p === product.id,
    ),
  );

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
    <div className={styles.productWrapper}>
      {
        <ProductTitle
          title={product.title}
          serialNumber={product.serialNumber}
        />
      }
      {<Guarantee dates={product.guarantee} />}
      <div>{product.type}</div>
      <div className={styles.productStatus}>
        {product.isNew > 0 ? "NEW" : "USED"}
      </div>
      <div>
        {product.price.map((item) => (
          <Price key={item.value} price={item} />
        ))}
      </div>
      <div>{productOrders[0].title}</div>
      <DeleteButton onDelete={deleteHandler} />
      {showModal && (
        <Modal
          title={product.title}
          onConfirm={() => confirmDeleteHandler(product.id)}
          onCancel={cancelHandler}
        />
      )}
    </div>
  );
}
