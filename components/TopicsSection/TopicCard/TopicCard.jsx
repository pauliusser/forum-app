import React from "react";
import styles from "./styles.module.css";

const TopicCard = ({ title, initialPost, creatorName, creatroPic }) => {
  console.log(creatorName, creatroPic);
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
    </div>
  );
};

export default TopicCard;
