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

  const user = {
    name: name,
    email: email,
    password: pass,
    profile_picture: pic,
  };

  const submitAction = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/register`,
        user
      );

      console.log(response);

      router.push("/logIn");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PageTemplate>
      <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
        <h1>Register</h1>
        <label htmlFor="name">Nickname</label>
        <input
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
      </form>
    </PageTemplate>
  );
};

export default Register;
