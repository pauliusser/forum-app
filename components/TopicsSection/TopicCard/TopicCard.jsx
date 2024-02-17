import React from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/router";

const TopicCard = ({
  title,
  initialPost,
  creatorName,
  creatroPic,
  id,
  deleteTopic,
  isCreator,
}) => {
  const router = useRouter();

  const deleteClick = () => {
    deleteTopic(id);
  };
  const titleClick = () => {
    router.push(`/topic/${id}`);
  };

  return (
    <div className={styles.topicCard}>
      <div className={styles.user}>
        <img src={creatroPic}></img>
        <h4>{creatorName}</h4>
      </div>

      <h4 className={styles.votes}>
        {initialPost.votes}
        <br />
        votes
      </h4>

      <div>
        <h3 onClick={titleClick} className={styles.title}>
          {title}
        </h3>
        {initialPost && <p>{initialPost.content}</p>}
      </div>
      {isCreator && (
        <button className={styles.deleteBtn} onClick={deleteClick}>
          delete Topic
        </button>
      )}
    </div>
  );
};

export default TopicCard;
