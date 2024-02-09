import PageTemplate from "@/components/PageTemplate/PageTemplate";
import React, { useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import "dotenv/config";

const Register = () => {
  const [name, setName] = useState("spongebob");
  const [email, setEmail] = useState("sponge@bikini.bottom");
  const [pass, setPass] = useState("secretRecipy123");
  const [repPass, setRepPass] = useState("secretRecipy123");
  const [pic, setPic] = useState(
    "https://i.scdn.co/image/3fb9fb7e2c4ae8bbfb5b3343e03fcbc77c40b8a1"
  );

  const user = {
    name: name,
    email: email,
    password: pass,
    profile_picture: pic,
  };

  const submitAction = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/users/register`, user);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PageTemplate>
      <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="name">Nickname</label>
        <input
          id="name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          placeholder="spongebob"
          type="text"></input>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          placeholder="sponge@bikini.bottom"
          type="email"></input>

        <label htmlFor="pass">Password</label>
        <input
          id="pass"
          value={pass}
          onChange={(event) => {
            setPass(event.target.value);
          }}
          placeholder="secretRecipy123"
          type="password"></input>

        <label htmlFor="repPass">Repeat password</label>
        <input
          id="repPass"
          value={repPass}
          onChange={(event) => {
            setRepPass(event.target.value);
          }}
          placeholder="secretRecipy123"
          type="password"></input>

        <label htmlFor="pic">Profile picture</label>
        <input
          id="pic"
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
