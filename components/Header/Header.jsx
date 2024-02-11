import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Link from "next/link";

const Header = () => {
  const router = useRouter();
  const [jwtToken, setJwtToken] = useState("");

  const logOut = () => {
    Cookies.remove("jwt_token");
    router.push("/logIn");
  };

  useEffect(() => {
    setJwtToken(Cookies.get("jwt_token"));
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.contentWrapper}>
        <div>Logo</div>
        {jwtToken ? (
          <nav>
            <ul>
              <li>
                <Link href="/">Loby</Link>
              </li>
              <li>
                <Link href="#">Contacts</Link>
              </li>
              <li>
                <button onClick={logOut}>LogOut</button>
              </li>
            </ul>
          </nav>
        ) : (
          <nav>
            <ul>
              <li>
                <Link href="/logIn">Log In</Link>
              </li>
              <li>
                <Link href="/register">Register</Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
