import React from "react";
import styles from "./styles.module.css";
const PostCard = ({ content, author, deletePost, id }) => {
  return (
    <div className={styles.postCard}>
      <div className={styles.user}>
        <img src={author.profile_picture}></img>
        <h4>{author.name}</h4>
      </div>
      <div className={styles.vote}>
        <button>↑</button>
        <h4>0</h4>
        <h4>votes</h4>
        <button>↓</button>
      </div>
      <p>{content}</p>
      <button
        className={styles.deleteBtn}
        onClick={() => {
          deletePost(id);
        }}>
        Delete post
      </button>
    </div>
  );
};

export default PostCard;
