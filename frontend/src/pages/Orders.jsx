import { useState } from "react";
import OrderDetails from "../components/ordersPage/OrderDetails";
import OrdersList from "../components/ordersPage/OrdersList";
import OrdersWrapper from "../components/ordersPage/OrdersWrapper";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

export default function Orders() {
  const [activeOrderId, setActiveOrderId] = useState(null);
  const orders = useSelector((state) => state.orders.list);

  const activeOrder = orders.find((order) => order.id === activeOrderId);
  function closeDetailsHandler() {
    setActiveOrderId(null);
  }

  return (
    <OrdersWrapper>
      <OrdersList setOrder={setActiveOrderId} />
      <AnimatePresence>
        {activeOrderId && (
          <motion.div
            key={activeOrderId}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
            style={{ width: "100%" }}
          >
            <OrderDetails order={activeOrder} onClose={closeDetailsHandler} />
          </motion.div>
        )}
      </AnimatePresence>
    </OrdersWrapper>
  );
}
