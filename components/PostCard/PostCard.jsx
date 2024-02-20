import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import { convertDate } from "../../src/helpers/helpers.jsx";

const PostCard = ({
  content,
  authorName,
  authorProfilePicture,
  deleteConfiramtion,
  id,
  initialVotes,
  userVote,
  isAuthor,
  isFirstPost,
  userStatus,
  authorStatus,
  createdAt,
  noCount,
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
  const [isDelAnimActive, setIsDelAnimActive] = useState(false);
  const [isUpvoteAnimActive, setIsUpvoteAnimActive] = useState(false);
  const [isDownvoteAnimActive, setIsDownvoteAnimActive] = useState(false);
  const [isOveride, setIsOveride] = useState(false);

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
  const updateVote = async (value) => {
    let voteType = "";
    if (value === 2) {
      voteType = "upvote";
    }
    if (value === -2) {
      voteType = "downvote";
    }

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/votes/${id}`,
        { type: voteType },
        { headers: headers }
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
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
    setIsOveride(false);
  }, [noCount]);

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
      updateVote(vote - oldVote);
    } else if (!oldVote && vote) {
      createVote();
    } else if (oldVote && !vote) {
      deleteVote();
    }
    setVoteCounter(otherUsersVotes + vote);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vote]);

  return (
    <div
      className={styles.postCard}
      style={{
        backgroundColor: isFirstPost && "white",
        border: isFirstPost && "solid 3px var(--black-col)",
      }}>
      <img
        className={`${styles.blendImage} ${styles.delteAnim}`}
        style={{ opacity: (isDelAnimActive || isOveride) && "100%" }}></img>
      <img
        className={`${styles.blendImage} ${styles.upvoteAnim}`}
        style={{ opacity: isUpvoteAnimActive && !upvoteBtn && "100%" }}></img>
      <img
        className={`${styles.blendImage} ${styles.downvoteAnim}`}
        style={{ opacity: isDownvoteAnimActive && !downvoteBtn && "100%" }}></img>
      <div className={styles.contentWrapper}>
        <div className={styles.userPannel}>
          <div className={styles.user}>
            <img src={authorProfilePicture} className={styles.profilePic}></img>
            <div className={styles.postDetails}>
              <h5>{authorStatus}</h5>
              <h4>{authorName}</h4>
              <h6>{convertDate(createdAt).date}</h6>
              <h6>{convertDate(createdAt).time}</h6>
            </div>
          </div>
          <div className={styles.vote}>
            {isAuthor ? (
              <>
                <h4>{voteCounter}</h4>
                <h4>votes</h4>
              </>
            ) : (
              <>
                <button
                  onMouseEnter={() => {
                    setIsUpvoteAnimActive(true);
                  }}
                  onMouseLeave={() => {
                    setIsUpvoteAnimActive(false);
                  }}
                  onClick={upvoteClick}
                  className={`${upvoteBtn ? styles.btnUpvoteActive : null} ${
                    styles.btnUpvote
                  }`}>
                  ↑
                </button>
                <h4>{voteCounter}</h4>
                <h4>votes</h4>
                <button
                  onMouseEnter={() => {
                    setIsDownvoteAnimActive(true);
                  }}
                  onMouseLeave={() => {
                    setIsDownvoteAnimActive(false);
                  }}
                  onClick={downvoteClick}
                  className={`${downvoteBtn ? styles.btnDownvoteActive : null} ${
                    styles.btnDownvote
                  }`}>
                  ↓
                </button>
              </>
            )}
          </div>
        </div>
        <p>{content}</p>
        {((!isFirstPost && isAuthor) || (!isFirstPost && userStatus === "admin")) && (
          <button
            className={styles.deleteBtn}
            onMouseEnter={() => {
              setIsDelAnimActive(true);
            }}
            onMouseLeave={() => {
              setIsDelAnimActive(false);
            }}
            onClick={() => {
              setIsOveride(true);
              deleteConfiramtion(id);
            }}>
            Delete post
          </button>
        )}
      </div>
    </div>
  );
};

export default PostCard;
