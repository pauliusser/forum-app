import React from "react";
import styles from "./styles.module.css";

const TopicCard = ({ title }) => {
  return <div className={styles.topicCard}>{title}</div>;
};

export default TopicCard;
