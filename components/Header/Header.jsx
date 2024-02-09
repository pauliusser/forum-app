import React from "react";
import styles from "./styles.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div>Logo</div>
      <nav>
        <ul>
          <li>
            <a href="#">Loby</a>
          </li>
        </ul>
      </nav>
      <nav>
        <ul>
          <li>
            <a href="#">Log In</a>
          </li>
          <li>
            <a href="/register">Register</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
