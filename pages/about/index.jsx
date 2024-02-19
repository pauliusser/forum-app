import React, { useEffect } from "react";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import styles from "./styles.module.css";
import myPic from "../../src/images/my profile picture.jpg";
import axios from "axios";
import Cookies from "js-cookie";

const About = () => {
  return (
    <PageTemplate>
      <div className={styles.pageWrapper}>
        <div className={styles.contentWrapper}>
          <h1>About</h1>
          <img src={myPic.src} className={styles.myPic}></img>
          <h3>Paulius Šermukšnis</h3>
          <p>
            This is a simple forum application designed and created as a final project of
            front-end soft beginner programmers course to demonstrate my programming
            skills of front-end app and back-end api
          </p>
          <h3>Disclaimer</h3>
          <p>
            for the moment all forum users are not real and all posts are fictional Al
            generated content
          </p>
        </div>
      </div>
    </PageTemplate>
  );
};

export default About;
