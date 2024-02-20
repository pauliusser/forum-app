import React, { useEffect, useState } from "react";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import { useRouter } from "next/router";
import "dotenv/config";
import axios from "axios";
import Cookies from "js-cookie";
import PostCard from "@/components/PostCard/PostCard";
import NewPost from "@/components/NewPost/NewPost";
import styles from "./styles.module.css";
import { authorization } from "@/src/helpers/helpers";

const Topic = () => {
  //autorizacija paleidziama viena karta ir po to kas minute

  const router = useRouter();
  const topicId = router.query.id;

  const headers = {
    authorization: Cookies.get("jwt_token"),
  };

  const [title, setTitle] = useState("");
  const [posts, setPosts] = useState([]);
  const [isNewPost, setNewPost] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [userStatus, setUserStatus] = useState("");
  const [isDeleteAlert, setIsDeleteAlert] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [noCount, setNoCount] = useState(0);

  const deleteConfiramtion = (id) => {
    setIsDeleteAlert(true);
    setDeleteId(id);
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${topicId}`,
        { headers: headers }
      );
      console.log("posts:", response.data);
      setPosts(response.data.posts);
    } catch (err) {
      console.log(err);
      // router.push("/");
    }
  };
  const fetchTopicTitle = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/topics/${topicId}`,
        { headers: headers }
      );
      console.log("topic:", response.data);
      setTitle(response.data.topic.title);
      setUserStatus(response.data.status);
    } catch (err) {
      console.log(err);
      // router.push("/");
    }
  };
  const submitNewPost = async (content) => {
    console.log("submit new post clicked");

    const data = {
      content: content,
      topicId: topicId,
    };

    try {
      const postResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/posts`,
        data,
        { headers: headers }
      );
      console.log(postResponse);
    } catch (err) {
      console.log(err);
    }

    setClickCount(clickCount + 1);
  };

  const deletePostData = async (id) => {
    console.log("delete post: ", id);
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`,
        {
          headers: headers,
        }
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
    setClickCount(clickCount + 1);
  };

  delete useEffect(() => {
    if (topicId) {
      fetchTopicTitle();
      fetchPosts();
    }
  }, [topicId, clickCount]);

  useEffect(() => {
    authorization(router);
    const authInterval = setInterval(() => {
      authorization(router);
    }, 60000);
    return () => clearInterval(authInterval);
  }, []);
  useEffect(() => {
    authorization(router);
  }, [clickCount, isDeleteAlert]);

  return (
    <PageTemplate>
      {posts[0] ? (
        <div className={styles.pageWrapper}>
          {title && (
            <div className={styles.titleWrapper}>
              <h1>{title}</h1>
            </div>
          )}
          {posts[0] &&
            posts.map((post, index) => {
              return (
                <PostCard
                  isFirstPost={index === 0}
                  key={post._id}
                  id={post._id}
                  initialVotes={post.votes}
                  userVote={post.userVote}
                  isAuthor={post.isAuthor}
                  content={post.content}
                  authorName={post.authorName}
                  authorProfilePicture={post.authorProfilePicture}
                  deleteConfiramtion={deleteConfiramtion}
                  userStatus={userStatus}
                  authorStatus={post.authorDetails[0].status}
                  createdAt={post.createdAt}
                  noCount={noCount}
                />
              );
            })}
          {isNewPost ? (
            <NewPost setNewPost={setNewPost} submitNewPost={submitNewPost} />
          ) : (
            <button
              className={styles.newPostBtn}
              onClick={() => {
                setNewPost(true);
              }}>
              New Post
            </button>
          )}
        </div>
      ) : (
        <img className={styles.spinner}></img>
      )}

      {isDeleteAlert && (
        <div className={styles.alertWrapper}>
          <div className={styles.alertMessage}>
            <h2>CONFIRM DELETE ?</h2>
            <div className={styles.alertButtons}>
              <button
                onClick={() => {
                  deletePostData(deleteId);
                  setIsDeleteAlert(false);
                }}
                className={styles.yesBtn}>
                Yes
              </button>
              <button
                onClick={() => {
                  setIsDeleteAlert(false);
                  setNoCount(noCount + 1);
                }}
                className={styles.noBtn}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </PageTemplate>
  );
};

export default Topic;
