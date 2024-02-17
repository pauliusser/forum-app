import React, { useEffect, useState } from "react";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import styles from "./styles.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const LogIn = () => {
  const [email, setEmail] = useState("sponge@bikini.bottom");
  const [pass, setPass] = useState("secretRecipy123");
  const router = useRouter();

  const user = {
    email: email,
    password: pass,
  };

  const logInAction = async () => {
    // console.log("log in btn clicked");
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/logIn`,
        user
      );
      // console.log(response.data.jwt_token);
      Cookies.set("jwt_token", response.data.jwt_token);
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PageTemplate>
      <div className={styles.wrapper}>
        <form
          className={styles.form}
          onSubmit={(event) => {
            event.preventDefault();
          }}>
          <h1>Log In</h1>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}></input>

          <label htmlFor="pass">Password</label>
          <input
            id="pass"
            type="password"
            autoComplete="current-password"
            value={pass}
            onChange={(event) => {
              setPass(event.target.value);
            }}></input>

          <button type="submit" onClick={logInAction}>
            LogIn
          </button>
        </form>
      </div>
    </PageTemplate>
  );
};

export default LogIn;
