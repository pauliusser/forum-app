import React from "react";
import styles from "./styles.module.css";
import { useState } from "react";

const NewPost = ({ setNewPost, submitNewPost }) => {
  const [content, setContent] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);

  const validateTextArea = () => {
    content ? setIsEmpty(false) : setIsEmpty(true);
    return !!content;
  };

  return (
    <>
      <div className={styles.animation}></div>
      <form
        className={styles.newPost}
        onSubmit={(event) => {
          event.preventDefault();
        }}>
        <label htmlFor="content">Content</label>
        <textarea
          style={{ border: isEmpty && "solid 1px var(--accent-red)" }}
          placeholder="write anything you like"
          id="content"
          value={content}
          onChange={(event) => {
            setContent(event.target.value);
          }}></textarea>
        <div className={styles.buttons}>
          <button
            className={styles.SubmitBtn}
            type="submit"
            onClick={() => {
              if (validateTextArea()) {
                submitNewPost(content);
                setNewPost(false);
              }
            }}>
            Submit
          </button>
          <button
            className={styles.cancelBtn}
            onClick={() => {
              setNewPost(false);
            }}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default NewPost;
