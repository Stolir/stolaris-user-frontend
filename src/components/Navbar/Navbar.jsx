import { Link, useNavigate } from "react-router";
import styles from "./Navbar.module.css";
import { Menu, User, UserCircle } from "iconoir-react";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import { useAuth } from "../../context/AuthContext";

function NavList() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await fetch("/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    logout();
    navigate("/");
  }

  return (
    <>
      <li>
        <Link to="/about-me">ABOUT ME</Link>
      </li>
      <li>
        <Link to="/contact">CONTACT</Link>
      </li>
      {user ? (
        <>
          <li>
            <Link to="/profile">PROFILE</Link>
          </li>
          <li>
            <button onClick={handleLogout}>LOGOUT</button>
          </li>
        </>
      ) : (
        <li>
          <Link to="/login">LOGIN</Link>
        </li>
      )}
    </>
  );
}

function Navbar() {
  return (
    <>
      <header className={styles.navbar}>
        <Link className={styles.logo} to="/">
          AA<span>.</span>
        </Link>
        <nav aria-label="Main Navigation" className={styles.navbarContent}>
          <ul>
            <NavList />
          </ul>
        </nav>
        <div className={styles.menuToggle}>
          <BurgerMenu>
            <NavList />
          </BurgerMenu>
        </div>
      </header>
      <hr />
    </>
  );
}

export default Navbar;
