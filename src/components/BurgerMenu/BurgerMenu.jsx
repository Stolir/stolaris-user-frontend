import { Link } from "react-router";
import styles from "./BurgerMenu.module.css";
import { UserCircle } from "iconoir-react";
import { useState } from "react";
import FocusTrap from "../FocusTrap/FocusTrap";

function BurgerMenu({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen);
  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <FocusTrap isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className={styles.burgerMenu}>
        <button
          className={`${styles.menuButton} ${isOpen ? styles.open : ""}`}
          onClick={toggleMenu}
          type="button"
          aria-label="Open menu"
        >
          <span aria-hidden={true}></span>
        </button>

        <aside className={styles.sidebar} inert={!isOpen} aria-hidden={!isOpen}>
          <nav aria-label="Menu Navigation" className={styles.navbarContent}>
            <ul>{children}</ul>
          </nav>
        </aside>
      </div>
    </FocusTrap>
  );
}

export default BurgerMenu;
