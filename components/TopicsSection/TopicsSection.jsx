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
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [updateTopicCount, setUpdateTopicCount] = useState(0);
  const [userStatus, setUserStatus] = useState("");
  const [isAllTopicsActive, setIsAllTopicsActive] = useState(true);
  const [isFilteredTopicsActive, setIsFilteredTopicsActive] = useState(false);
  const [topicsOnDisplay, setTopicsOnDisplay] = useState([]);

  const clickAllTopics = () => {
    setIsAllTopicsActive(true);
    setIsFilteredTopicsActive(false);
    setTopicsOnDisplay(topics);
  };
  const clickFilteredTopics = () => {
    setIsAllTopicsActive(false);
    setIsFilteredTopicsActive(true);
    setTopicsOnDisplay(filteredTopics);
  };

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
      setUserStatus(response.data.status);
      console.log("topics:", response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTopic = async (id) => {
    const headers = {
      authorization: Cookies.get("jwt_token"),
    };
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/topics/${id}`,
        { headers: headers }
      );
      console.log(response.data);
      setUpdateTopicCount(updateTopicCount + 1);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (topics) {
      const filtered = topics.filter((topic) => {
        return topic.isCreator;
      });
      setFilteredTopics(filtered);
      setTopicsOnDisplay(topics);
    }
  }, [topics]);

  useEffect(() => {
    fetchTopics();
  }, [isNewTopic, updateTopicCount]);

  return (
    <div className={styles.wrapper}>
      <section className={styles.topicsSection}>
        <div className={styles.topicsFilter}>
          <h2 onClick={clickAllTopics}>All Topics</h2>
          <h2 onClick={clickFilteredTopics}>My Topics</h2>
        </div>
        {topicsOnDisplay &&
          topicsOnDisplay.map((topic) => {
            return (
              <TopicCard
                key={topic._id}
                id={topic._id}
                deleteTopic={deleteTopic}
                title={topic.title}
                initialPost={topic.initialPostDetails[0]}
                creatorName={topic.creatorDetails[0].name}
                creatroPic={topic.creatorDetails[0].profile_picture}
                isCreator={topic.isCreator}
                userStatus={userStatus}
              />
            );
          })}
        <button
          className={styles.newTopicBtn}
          onClick={() => {
            setIsNewTopic(true);
          }}>
          Create new topic
        </button>
        {isNewTopic && <NewTopicForm formClose={closeForm} />}
      </section>
    </div>
  );
};

export default TopicsSection;
