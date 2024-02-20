import React from "react";
import styles from "./styles.module.css";
import LinkedIn from "./LinkedIn/LinkedIn";
import archiLogo from "../../src/images/Archi logo akis-04.png";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <ul>
        <li>
          <Link
            target="_blank"
            href="https://www.linkedin.com/in/paulius-%C5%A1ermuk%C5%A1nis-659505b9/">
            <LinkedIn />
          </Link>
        </li>
        <li>
          <Link target="_blank" href="https://archi.lt/">
            <img className={styles.archiLogo} src={archiLogo.src}></img>
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
