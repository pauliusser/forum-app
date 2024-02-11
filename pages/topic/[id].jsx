import React, { useEffect, useState } from "react";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import { useRouter } from "next/router";
import "dotenv/config";
import axios from "axios";
import Cookies from "js-cookie";
import PostCard from "@/components/PostCard/PostCard";
import NewPost from "@/components/NewPost/NewPost";
import styles from "./styles.module.css";

const Topic = () => {
  const router = useRouter();
  const topicId = router.query.id;

  const headers = {
    authorization: Cookies.get("jwt_token"),
  };

  const [title, setTitle] = useState("");
  const [posts, setPosts] = useState([]);
  const [isNewPost, setNewPost] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${topicId}`,
        { headers: headers }
      );
      // console.log("post response: ", response);
      setPosts(response.data.posts);
      setTitle(response.data.posts[0].topic.title);
    } catch (err) {
      console.log(err);
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

  const deletePost = async (id) => {
    console.log("delete post: ", id);
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`,
        {
          headers: headers,
        }
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    setClickCount(clickCount + 1);
  };

  delete useEffect(() => {
    fetchPosts();
  }, [topicId, clickCount]);

  return (
    <PageTemplate>
      <div className={styles.pageWrapper}>
        {title && <h1>{title}</h1>}
        {posts &&
          posts.map((post) => {
            return (
              <PostCard
                key={post._id}
                id={post._id}
                content={post.content}
                author={post.author}
                deletePost={deletePost}
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
    </PageTemplate>
  );
};

export default Topic;