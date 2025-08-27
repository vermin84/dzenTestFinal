import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import TopMenu from "./TopMenu";
import NavigationMenu from "./NavigationMenu";
import styles from "./AppLayout.module.css";

export default function AppLayout() {
  const location = useLocation();

  return (
    <>
      <TopMenu />
      <main className={styles.appLayoutWrapper}>
        <NavigationMenu />
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
            style={{ width: "100%", height: "100%" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </>
  );
}
