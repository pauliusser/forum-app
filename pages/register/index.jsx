import PageTemplate from "@/components/PageTemplate/PageTemplate";
import React, { useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import "dotenv/config";
import { useRouter } from "next/router";

const Register = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [repPass, setRepPass] = useState("");
  const [pic, setPic] = useState("");

  const [nameValidate, setNameValidate] = useState(false);
  const [emailValidate, setEmailValidate] = useState(false);
  const [passValidate, setPassValidate] = useState(false);
  const [repPassValidate, setRepPassValidate] = useState(false);
  const [picValidate, setPicValidate] = useState(false);

  const [isAlert, setIsAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const user = {
    name: name,
    email: email,
    password: pass,
    profile_picture: pic,
  };

  const isValidEmail = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const isValidUrl = (url) => {
    // Regular expression for basic URL validation
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
  };

  const submitAction = async () => {
    name ? setNameValidate(false) : setNameValidate(true);
    email ? setEmailValidate(false) : setEmailValidate(true);
    pass ? setPassValidate(false) : setPassValidate(true);
    repPass ? setRepPassValidate(false) : setRepPassValidate(true);
    pic ? setPicValidate(false) : setPicValidate(true);
    if (!name || !email || !pass || !repPass || !pic) {
      setAlertMsg("required fields");
      setIsAlert(true);
      return;
    }
    if (pass !== repPass) {
      setPassValidate(true);
      setRepPassValidate(true);
      setAlertMsg("pasword mismatch");
      setIsAlert(true);
      console.log("mismatch");
      return;
    }
    if (!isValidEmail(email)) {
      setEmailValidate(true);
      setIsAlert(true);
      setAlertMsg("invalid email");
      return;
    }
    if (!isValidUrl(pic)) {
      setPicValidate(true);
      setIsAlert(true);
      setAlertMsg("invalid URL");
      return;
    }
    setIsAlert(false);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/register`,
        user
      );

      console.log(response.data);

      router.push("/logIn");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PageTemplate>
      <div className={styles.wrapper}>
        <img className={styles.bgPicture}></img>
        <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
          <h1>Register</h1>
          <label htmlFor="name">Nickname</label>
          <input
            style={{
              border: nameValidate
                ? "1px solid var(--accent-red)"
                : "1px solid transparent",
            }}
            id="name"
            autoComplete="off"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            placeholder="spongebob"
            type="text"></input>

          <label htmlFor="email">Email</label>
          <input
            style={{
              border: emailValidate
                ? "1px solid var(--accent-red)"
                : "1px solid transparent",
            }}
            id="email"
            autoComplete="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            placeholder="sponge@bikini.bottom"
            type="email"></input>

          <label htmlFor="pass">Password</label>
          <input
            style={{
              border: passValidate
                ? "1px solid var(--accent-red)"
                : "1px solid transparent",
            }}
            id="pass"
            autoComplete="new-password"
            value={pass}
            onChange={(event) => {
              setPass(event.target.value);
            }}
            placeholder="secretRecipy123"
            type="password"></input>

          <label htmlFor="repPass">Repeat password</label>
          <input
            style={{
              border: repPassValidate
                ? "1px solid var(--accent-red)"
                : "1px solid transparent",
            }}
            id="repPass"
            autoComplete="off"
            value={repPass}
            onChange={(event) => {
              setRepPass(event.target.value);
            }}
            placeholder="secretRecipy123"
            type="password"></input>

          <label htmlFor="pic">Profile picture</label>
          <input
            style={{
              border: picValidate
                ? "1px solid var(--accent-red)"
                : "1px solid transparent",
            }}
            id="pic"
            autoComplete="off"
            value={pic}
            onChange={(event) => {
              setPic(event.target.value);
            }}
            placeholder="URL"
            type="url"></input>

          <button type="submit" onClick={submitAction}>
            Register
          </button>
          {isAlert && <h5 className={styles.alertMsg}>{alertMsg}</h5>}
        </form>
      </div>
    </PageTemplate>
  );
};

export default Register;
