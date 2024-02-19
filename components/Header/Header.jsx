import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Link from "next/link";
import logo from "../../src/images/small talk logo.png";
import Burger from "./Burger/Burger";

const Header = ({ userStatus, userName, userPic }) => {
  const router = useRouter();
  const [jwtToken, setJwtToken] = useState("");
  const [isUserDataExist, setIsUserDataExist] = useState(false);
  const [isBurgerMenu, setIsBurgerMenu] = useState(false);

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

  const NavLogedTOut = () => {
    return (
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
    );
  };
  const NavLogedIn = () => {
    return (
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
    );
  };

  return (
    <>
      <div className={`${styles.burgerMenu} ${isBurgerMenu && styles.burgerMenuActive}`}>
        {jwtToken ? <NavLogedIn /> : <NavLogedTOut />}
      </div>
      <header className={styles.header}>
        <div className={styles.contentWrapper}>
          <img src={logo.src} className={styles.logo} />
          {isUserDataExist && (
            <div className={styles.userWrapper}>
              <h3 className={styles.userStatus}>{userStatus}</h3>
              <img src={userPic} className={styles.profilePic} />
              <h3 className={styles.userName}>{userName}</h3>
            </div>
          )}
          {jwtToken ? <NavLogedIn /> : <NavLogedTOut />}
          <div
            className={styles.burger}
            onClick={() => {
              setIsBurgerMenu(!isBurgerMenu);
            }}>
            <Burger />
          </div>
        </div>
      </header>
      <div className={styles.headerPlaceholder}></div>
    </>
  );
};

export default Header;
