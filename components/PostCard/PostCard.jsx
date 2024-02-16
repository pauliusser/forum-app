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
}) => {
  const [voteCounter, setVoteCounter] = useState(initialVotes);
  const [upvoteBtn, setUpvoteBtn] = useState(
    userVote === "upvote" ? true : userVote === "downvote" ? false : false
  );
  const [downvoteBtn, setDownvoteBtn] = useState(
    userVote === "downvote" ? true : userVote === "upvote" ? false : false
  );
  const [oldVote, setOldVote] = useState(0);
  const [vote, setVote] = useState(
    userVote === "upvote" ? 1 : userVote === "downvote" ? -1 : 0
  );
  const [isVotingInitialized, setIsVotingInitialized] = useState(false);
  const [isButtonsInitialized, setisButtonsInitialized] = useState(false);

  const headers = {
    authorization: Cookies.get("jwt_token"),
  };

  const upvoteClick = () => {
    setUpvoteBtn(!upvoteBtn);
    setDownvoteBtn(false);
  };
  const downvoteClick = () => {
    setUpvoteBtn(false);
    setDownvoteBtn(!downvoteBtn);
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

  const conosleLogAll = () => {
    console.log(
      " voteCounter:",
      voteCounter,
      " upvoteBtn:",
      upvoteBtn,
      " downvoteBtn:",
      downvoteBtn,
      " oldVote:",
      oldVote,
      " vote:",
      vote,
      " isVotingInitialized:",
      isVotingInitialized,
      " isButtonsInitialized:",
      isButtonsInitialized
    );
  };
  useEffect(() => {
    conosleLogAll();
    setisButtonsInitialized(true);
    setIsVotingInitialized(true);
  }, []);

  useEffect(() => {
    if (!isButtonsInitialized) {
      return;
    }
    manageVoteStates();
    conosleLogAll();
  }, [upvoteBtn, downvoteBtn]);

  useEffect(() => {
    if (!isVotingInitialized) {
      return;
    }
    if (Math.abs(vote - oldVote) === 2) {
      updateVote();
      return;
    }
    if (!oldVote && vote) {
      createVote();
      return;
    }
    if (oldVote && !vote) {
      deleteVote();
      return;
    }
  }, [vote]);

  return (
    <div className={styles.postCard}>
      <div className={styles.user}>
        <img src={authorProfilePicture}></img>
        <h4>{authorName}</h4>
      </div>
      <div className={styles.vote}>
        <button onClick={upvoteClick} className={upvoteBtn ? styles.active : null}>
          ↑
        </button>
        <h4>{voteCounter}</h4>
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
