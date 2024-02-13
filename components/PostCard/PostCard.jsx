import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import Cookies from "js-cookie";

const PostCard = ({ content, author, deletePost, id, initialVotes }) => {
  const [nonUserVotes, setnonUserVotes] = useState(initialVotes);
  const [upvoteBtn, setUpvoteBtn] = useState(false);
  const [downvoteBtn, setDownvoteBtn] = useState(false);
  const [vote, setVote] = useState(0);
  const [isVoting, setIsVoting] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [isFirsRun, setIsFirsRun] = useState(true);
  const [isFirsGo, setIsFirsGo] = useState(true);

  const headers = {
    authorization: Cookies.get("jwt_token"),
  };

  const upvoteClick = () => {
    setUpvoteBtn(!upvoteBtn);
    setDownvoteBtn(false);
    setClickCount(clickCount + 1);
  };
  const downvoteClick = () => {
    setUpvoteBtn(false);
    setDownvoteBtn(!downvoteBtn);
    setClickCount(clickCount + 1);
  };

  const createVote = async () => {
    console.log("create vote");
    try {
      const crVoteData = {
        post: id,
        type: vote === 1 ? "upvote" : "downvote",
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/votes`,
        crVoteData,
        { headers: headers }
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateVote = async () => {
    console.log("update vote");
  };

  const deleteVote = async () => {
    console.log("delete vote");

    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/votes/${id}`,
        {
          headers: headers,
        }
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isFirsRun) {
      setIsFirsRun(false);
      return;
    }

    switch (true) {
      case upvoteBtn === false && downvoteBtn === false:
        setVote(0);
        deleteVote();
        setIsVoting(false);
        break;

      case upvoteBtn === true && downvoteBtn === false:
        if (vote + 1 === 0) {
          updateVote();
        }
        setVote(1);
        setIsVoting(true);
        break;

      case upvoteBtn === false && downvoteBtn === true:
        if (vote - 1 === 0) {
          updateVote();
        }
        setVote(-1);
        setIsVoting(true);
        break;
    }
  }, [clickCount]);

  useEffect(() => {
    if (isFirsGo) {
      setIsFirsGo(false);
      return;
    }
    if (isVoting) {
      createVote();
    }
  }, [isVoting]);

  return (
    <div className={styles.postCard}>
      <div className={styles.user}>
        <img src={author.profile_picture}></img>
        <h4>{author.name}</h4>
      </div>
      <div className={styles.vote}>
        <button onClick={upvoteClick} className={upvoteBtn ? styles.active : null}>
          ↑
        </button>
        <h4>{nonUserVotes + vote}</h4>
        <h4>votes</h4>
        <button onClick={downvoteClick} className={downvoteBtn ? styles.active : null}>
          ↓
        </button>
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
