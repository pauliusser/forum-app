import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import "dotenv/config";
import NewTopicForm from "./NewTopicForm/NewTopicForm";
import TopicCard from "./TopicCard/TopicCard";
import { authorization } from "@/src/helpers/helpers";
import { useRouter } from "next/router";

const TopicsSection = () => {
  const [isNewTopic, setIsNewTopic] = useState(false);
  const [topics, setTopics] = useState([]);
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [updateTopicCount, setUpdateTopicCount] = useState(0);
  const [userStatus, setUserStatus] = useState("");
  const [isAllTopicsActive, setIsAllTopicsActive] = useState(true);
  const [isFilteredTopicsActive, setIsFilteredTopicsActive] = useState(false);
  const [topicsOnDisplay, setTopicsOnDisplay] = useState([]);
  const [isTopicsLoaded, setIsTopicsLoaded] = useState(false);
  const [isDeleteAlert, setIsDeleteAlert] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const router = useRouter();
  const [isAnimOn, setIsAnimOn] = useState(false);
  const [noCount, setNoCount] = useState(0);

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
      setIsTopicsLoaded(true);
      console.log("topics:", response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const deleteConfiramtion = (id) => {
    setIsDeleteAlert(true);
    setIsAnimOn;
    setDeleteId(id);
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
  const deactivateDelAnim = () => {
    return false;
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

  useEffect(() => {
    authorization(router);
    const authInterval = setInterval(() => {
      authorization(router);
    }, 60000);
    return () => clearInterval(authInterval);
  }, []);
  useEffect(() => {
    authorization(router);
  }, [isDeleteAlert, isNewTopic]);

  return (
    <>
      {isTopicsLoaded ? (
        <div className={styles.wrapper}>
          <section className={styles.topicsSection}>
            <div className={styles.topicsFilter}>
              <h2
                onClick={clickAllTopics}
                style={{ color: isAllTopicsActive ? "var(--accent-blue)" : "inherit" }}>
                All Topics
              </h2>
              <h2
                onClick={clickFilteredTopics}
                style={{
                  color: isFilteredTopicsActive ? "var(--accent-blue)" : "inherit",
                }}>
                My Topics
              </h2>
            </div>
            {topicsOnDisplay &&
              topicsOnDisplay.map((topic) => {
                return (
                  <TopicCard
                    key={topic._id}
                    id={topic._id}
                    deleteConfiramtion={deleteConfiramtion}
                    title={topic.title}
                    initialPost={topic.initialPostDetails[0]}
                    creatorName={topic.creatorDetails[0].name}
                    creatroPic={topic.creatorDetails[0].profile_picture}
                    isCreator={topic.isCreator}
                    userStatus={userStatus}
                    creatorStatus={topic.creatorDetails[0].status}
                    noCount={noCount}
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
                  deleteTopic(deleteId);
                  setIsDeleteAlert(false);
                }}
                className={styles.yesBtn}>
                Yes
              </button>
              <button
                onClick={() => {
                  setIsDeleteAlert(false);
                  setNoCount(noCount + 1);
                  setIsAnimOn(false);
                }}
                className={styles.noBtn}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopicsSection;
