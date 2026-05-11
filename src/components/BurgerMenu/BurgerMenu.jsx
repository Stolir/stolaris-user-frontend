import { Link } from "react-router";
import styles from "./BurgerMenu.module.css";
import { UserCircle } from "iconoir-react";
import { useState } from "react";
import { FocusTrap } from "focus-trap-react";

function BurgerMenu({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen(!isOpen);
    console.log(isOpen);
  }

  return (
    <FocusTrap active={isOpen}>
      <div className={styles.burgerMenu}>
        <button
          className={`${styles.menuButton} ${isOpen ? styles.open : ""}`}
          onClick={toggleMenu}
          type="button"
        >
          <span></span>
        </button>

        <aside className={styles.sidebar} inert={!isOpen} aria-hidden={true}>
          <nav aria-label="Menu Navigation" className={styles.navbarContent}>
            <ul>{children}</ul>
          </nav>
        </aside>
      </div>
    </FocusTrap>
  );
}

export default BurgerMenu;
