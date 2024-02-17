import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./styles.module.css";
import axios from "axios";
import Cookies from "js-cookie";

const PageTemplate = ({ children, setIsCookieExist }) => {
  const jwtToken = Cookies.get("jwt_token");

  const headers = {
    authorization: jwtToken,
  };

  const [userData, setUserData] = useState("");

  const getUserDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/current`,
        {
          headers: headers,
        }
      );
      // console.log(response.data);
      setUserData(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    // console.log(headers);
    jwtToken && getUserDetails();
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <Header
        userStatus={userData && userData.status}
        userName={userData && userData.user.name}
        userPic={userData && userData.user.profile_picture}
      />
      <div className={styles.contentWrapper}>{children}</div>
      <Footer />
    </div>
  );
};

export default PageTemplate;
