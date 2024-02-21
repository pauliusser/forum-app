import React, { useEffect, useState } from "react";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import styles from "./styles.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [emailValidate, setEmailValidate] = useState(false);
  const [passValidate, setPassValidate] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const router = useRouter();

  const user = {
    email: email,
    password: pass,
  };
  const isValidEmail = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const logInAction = async () => {
    email ? setEmailValidate(false) : setEmailValidate(true);
    pass ? setPassValidate(false) : setPassValidate(true);
    if (!email || !pass) {
      setIsAlert(true);
      setAlertMsg("required fields");
      return;
    }
    if (!isValidEmail(email)) {
      setEmailValidate(true);
      setIsAlert(true);
      setAlertMsg("invalid email");
      return;
    }
    setIsAlert(false);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/logIn`,
        user
      );
      Cookies.set("jwt_token", response.data.jwt_token);
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PageTemplate>
      <div className={styles.wrapper}>
        <img className={styles.bgPicture}></img>
        <form
          className={styles.form}
          onSubmit={(event) => {
            event.preventDefault();
          }}>
          <h1>Log In</h1>
          <label htmlFor="email">Email</label>
          <input
            style={{
              border: emailValidate
                ? "1px solid var(--accent-red)"
                : "1px solid transparent",
            }}
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}></input>

          <label htmlFor="pass">Password</label>
          <input
            style={{
              border: passValidate
                ? "1px solid var(--accent-red)"
                : "1px solid transparent",
            }}
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
          {isAlert && <h5 className={styles.alertMsg}>{alertMsg}</h5>}
        </form>
      </div>
    </PageTemplate>
  );
};

export default LogIn;
