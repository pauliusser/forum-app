import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import "dotenv/config";
import NewTopicForm from "./NewTopicForm/NewTopicForm";
import TopicCard from "./TopicCard/TopicCard";

const TopicsSection = () => {
  const [isNewTopic, setIsNewTopic] = useState(false);
  const [topics, setTopics] = useState([]);

  const closeForm = () => {
    setIsNewTopic(false);
  };

  const headers = {
    authorization: Cookies.get("jwt_token"),
  };
  const fetchTopics = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/topics`, {
        headers: headers,
      });
      setTopics(response.data.topics);
      console.log(response.data.topics);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, [isNewTopic]);

  return (
    <section className={styles.topicsSection}>
      <h1>Topics</h1>
      {topics &&
        topics.map((topic) => {
          return (
            <TopicCard
              key={topic._id}
              title={topic.title}
              initialPost={topic.initialPost}
              creatorName={topic.creator.name}
              creatroPic={topic.creator.profile_picture}
            />
          );
        })}
      <button
        onClick={() => {
          setIsNewTopic(true);
        }}>
        Create new topic
      </button>
      {isNewTopic && <NewTopicForm formClose={closeForm} />}
    </section>
  );
};

export default TopicsSection;
