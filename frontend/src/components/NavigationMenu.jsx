import styles from "./NavigationMenu.module.css";
import { NavLink } from "react-router-dom";
export default function NavigationMenu() {
  return (
    <aside className={styles.navigationMenuWrapper}>
      <nav>
        <ul className={styles.navigationMenuList}>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? ` ${styles.navigationMenuLink} ${styles.active}`
                  : styles.navigationMenuLink
              }
              to="orders"
            >
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? ` ${styles.navigationMenuLink} ${styles.active}`
                  : styles.navigationMenuLink
              }
              to="products"
            >
              Products
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
