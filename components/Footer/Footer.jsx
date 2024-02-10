import React from "react";
import styles from "./styles.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <ul>
        <li>
          <a href="#">social 1</a>
        </li>
        <li>
          <a href="#">social 2</a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
