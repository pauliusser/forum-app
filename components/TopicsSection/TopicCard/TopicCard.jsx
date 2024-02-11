import React from "react";
import styles from "./styles.module.css";
import axios from "axios";
import "dotenv/config";
// import { headers } from "next/headers";
import Cookies from "js-cookie";

const TopicCard = ({ title, initialPost, creatorName, creatroPic, id, deleteTopic }) => {
  const clickAction = () => {
    deleteTopic(id);
  };

  return (
    <div className={styles.topicCard}>
      <div className={styles.user}>
        <img src={creatroPic}></img>
        <h4>{creatorName}</h4>
      </div>
      <div>
        <h3>{title}</h3>
        {<p>{initialPost.content}</p>}
      </div>
      <button className={styles.deleteBtn} onClick={clickAction}>
        delete Topic
      </button>
    </div>
  );
};

export default TopicCard;
