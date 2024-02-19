import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Link from "next/link";
import logo from "../../src/images/small talk logo.png";

const Header = ({ userStatus, userName, userPic }) => {
  const router = useRouter();
  const [jwtToken, setJwtToken] = useState("");
  const [isUserDataExist, setIsUserDataExist] = useState(false);

  const logOut = () => {
    Cookies.remove("jwt_token");
    router.push("/logIn");
  };

  useEffect(() => {
    setJwtToken(Cookies.get("jwt_token"));
  }, []);
  useEffect(() => {
    setIsUserDataExist(userStatus && userName && userPic);
  }, [userStatus, userName, userPic]);

  return (
    <header className={styles.header}>
      <div className={styles.contentWrapper}>
        <img src={logo.src} className={styles.logo} />
        {isUserDataExist && (
          <div className={styles.userWrapper}>
            <h3>{userStatus}</h3>
            <img src={userPic} className={styles.profilePic} />
            <h3>{userName}</h3>
          </div>
        )}
        {jwtToken ? (
          <nav>
            <ul>
              <li>
                <Link href="/">Topics</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <a onClick={logOut}>LogOut</a>
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
