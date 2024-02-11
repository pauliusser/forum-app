import React from "react";
import styles from "./styles.module.css";
import { useState } from "react";

const NewPost = ({ setNewPost, submitNewPost }) => {
  const [content, setContent] = useState("");

  return (
    <form
      className={styles.newPost}
      onSubmit={(event) => {
        event.preventDefault();
      }}>
      <label htmlFor="content">Content</label>
      <textarea
        id="content"
        value={content}
        onChange={(event) => {
          setContent(event.target.value);
        }}></textarea>
      <div className={styles.buttons}>
        <button
          type="submit"
          onClick={() => {
            submitNewPost(content);
            setNewPost(false);
          }}>
          Submit
        </button>
        <button
          onClick={() => {
            setNewPost(false);
          }}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NewPost;
