import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import Cookies from "js-cookie";

const PostCard = ({
  content,
  authorName,
  authorProfilePicture,
  deletePost,
  id,
  initialVotes,
  userVote,
  isAuthor,
}) => {
  const userVoteVal = userVote === "upvote" ? 1 : userVote === "downvote" ? -1 : 0;
  const otherUsersVotes = initialVotes - userVoteVal;

  const [voteCounter, setVoteCounter] = useState(initialVotes);
  const [upvoteBtn, setUpvoteBtn] = useState(
    userVoteVal === 1 ? true : userVote === -1 ? false : false
  );
  const [downvoteBtn, setDownvoteBtn] = useState(
    userVoteVal === -1 ? true : userVote === 1 ? false : false
  );
  const [oldVote, setOldVote] = useState(0);
  const [vote, setVote] = useState(userVoteVal);
  const [isVotingInitialized, setIsVotingInitialized] = useState(false);
  const [isButtonsInitialized, setisButtonsInitialized] = useState(false);
  const [clickCount, setClickCount] = useState(0);

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
  const manageVoteStates = (arg) => {
    switch (true) {
      case upvoteBtn === false && downvoteBtn === false:
        setOldVote(vote);
        setVote(0);
        break;

      case upvoteBtn === true && downvoteBtn === false:
        setOldVote(vote);
        setVote(1);
        break;

      case upvoteBtn === false && downvoteBtn === true:
        setOldVote(vote);
        setVote(-1);
        break;
    }
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
    if (!isButtonsInitialized) {
      setisButtonsInitialized(true);
      return;
    }
    manageVoteStates();
  }, [clickCount]);

  useEffect(() => {
    if (!isVotingInitialized) {
      setIsVotingInitialized(true);
      return;
    }
    if (Math.abs(vote - oldVote) === 2) {
      updateVote();
    } else if (!oldVote && vote) {
      createVote();
    } else if (oldVote && !vote) {
      deleteVote();
    }
    setVoteCounter(otherUsersVotes + vote);
  }, [vote]);

  return (
    <div className={styles.postCard}>
      <div className={styles.user}>
        <img src={authorProfilePicture}></img>
        <h4>{authorName}</h4>
      </div>
      <div className={styles.vote}>
        {isAuthor ? (
          <>
            <h4>{voteCounter}</h4>
            <h4>votes</h4>
          </>
        ) : (
          <>
            <button onClick={upvoteClick} className={upvoteBtn ? styles.active : null}>
              ↑
            </button>
            <h4>{voteCounter}</h4>
            <h4>votes</h4>
            <button
              onClick={downvoteClick}
              className={downvoteBtn ? styles.active : null}>
              ↓
            </button>
          </>
        )}
      </div>
      <p>{content}</p>
      {isAuthor && (
        <button
          className={styles.deleteBtn}
          onClick={() => {
            deletePost(id);
          }}>
          Delete post
        </button>
      )}
    </div>
  );
};

export default PostCard;
