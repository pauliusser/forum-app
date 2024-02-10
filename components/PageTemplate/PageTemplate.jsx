import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./styles.module.css";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
import "dotenv/config";

const PageTemplate = ({ children }) => {
  const router = useRouter();

  const authorization = async () => {
    const jwtToken = Cookies.get("jwt_token");
    if (!jwtToken) {
      console.log("not authorized (no JWT token)");
      return;
    }
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/validate`,
        { headers: { authorization: jwtToken } }
      );
      console.log("authorized", response.status);
    } catch (err) {
      console.log("not authorized", err.response.status);
      Cookies.remove("jwt_token");
      router.push("/logIn");
    }
  };

  useEffect(() => {
    authorization();
  });

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <div className={styles.contentWrapper}>{children}</div>
      <Footer />
    </div>
  );
};

export default PageTemplate;
