import React, { useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import "dotenv/config";

const NewTopicForm = ({ formClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isTitleAlert, setIsTitleAlert] = useState(false);
  const [isContentAlert, setIsContentAlert] = useState(false);
  const newTopic = { title: title };

  const headers = {
    authorization: Cookies.get("jwt_token"),
  };
  const submitTopic = async () => {
    try {
      const topicResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/topics`,
        newTopic,
        { headers: headers }
      );
      console.log(topicResponse);
      return topicResponse.data.topic._id;
    } catch (err) {
      console.log(err);
    }
  };
  const submitPost = async (initialPost) => {
    try {
      const postResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/posts`,
        initialPost,
        { headers: headers }
      );
      console.log(postResponse);
    } catch (err) {
      console.log(err);
    }
  };
  const submitAction = async () => {
    title ? setIsTitleAlert(false) : setIsTitleAlert(true);
    content ? setIsContentAlert(false) : setIsContentAlert(true);
    if (!title || !content) {
      console.log("fill all fields");
      return;
    }
    const topicId = await submitTopic();

    const initialPost = {
      content: content,
      topicId: topicId,
    };

    await submitPost(initialPost);

    formClose();
  };

  return (
    <>
      <div className={styles.animation}></div>
      <form
        className={styles.newTopicForm}
        onSubmit={(event) => {
          event.preventDefault();
        }}>
        <h2>New Topic</h2>
        <button className={styles.closeBtn} onClick={formClose}>
          X
        </button>
        <label htmlFor="title">Topic Title</label>
        <input
          style={{ border: isTitleAlert && "solid 1px var(--accent-red)" }}
          type="text"
          id="title"
          placeholder="the amazing title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}></input>

        <label htmlFor="content">Content</label>
        <textarea
          style={{ border: isContentAlert && "solid 1px var(--accent-red)" }}
          id="content"
          cols="30"
          rows="10"
          placeholder="some content related to the topic"
          value={content}
          onChange={(event) => {
            setContent(event.target.value);
          }}></textarea>
        <button className={styles.submitBtn} onClick={submitAction}>
          Submit
        </button>
      </form>
    </>
  );
};

export default NewTopicForm;
