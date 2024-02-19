import React, { useState } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import { convertDate } from "../../../src/helpers/helpers.jsx";

const TopicCard = ({
  title,
  initialPost,
  creatorName,
  creatroPic,
  id,
  deleteTopic,
  isCreator,
  userStatus,
  creatorStatus,
}) => {
  const router = useRouter();
  const [isDelAnimActive, setIsDelAnimActive] = useState(false);
  const [isEnterAnimActive, setIsEnterAnimActive] = useState(false);
  const date = convertDate(initialPost.createdAt).date;
  const time = convertDate(initialPost.createdAt).time;

  const deleteClick = () => {
    deleteTopic(id);
  };
  const titleClick = () => {
    router.push(`/topic/${id}`);
  };

  return (
    <div className={styles.topicCard}>
      <div className={styles.bgAnim}>
        <div
          className={`${styles.blendImage} ${styles.enterAnim}`}
          style={{ opacity: isEnterAnimActive && "100%" }}></div>
        <div
          className={`${styles.blendImage} ${styles.deleteAnim}`}
          style={{ opacity: isDelAnimActive && "100%" }}></div>
      </div>

      {/* <img className={styles.Image}></img> */}
      <div className={styles.contentWrapper}>
        <div className={styles.user}>
          <img src={creatroPic} className={styles.userPic}></img>
          <h5>{creatorStatus}</h5>
          <h4>{creatorName}</h4>
        </div>

        {initialPost && (
          <h4 className={styles.votes}>
            {initialPost.votes}
            <br />
            votes
          </h4>
        )}

        <div>
          {title && (
            <h3
              onClick={titleClick}
              className={styles.title}
              onMouseEnter={() => {
                setIsEnterAnimActive(true);
              }}
              onMouseLeave={() => {
                setIsEnterAnimActive(false);
              }}>
              {title}
            </h3>
          )}
          {initialPost && <h5>{`${date} - ${time}`}</h5>}
          {initialPost && <p>{initialPost.content}</p>}
        </div>
        {(isCreator || userStatus === "admin") && (
          <button
            className={styles.deleteBtn}
            onClick={deleteClick}
            onMouseEnter={() => {
              setIsDelAnimActive(true);
            }}
            onMouseLeave={() => {
              setIsDelAnimActive(false);
            }}>
            delete Topic
          </button>
        )}
      </div>
      {/* <div className={styles.blendImage}></div> */}
    </div>
  );
};

export default TopicCard;
