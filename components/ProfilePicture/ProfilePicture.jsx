import React, { useState } from "react";
import styles from "./styles.module.css";
import DefaultPicture from "../../src/images/defaultUser.jpg";
import Image from "next/image";

const ProfilePictuer = ({ src }) => {
  const [isValid, setIsValid] = useState(true);
  return (
    <>
      {isValid ? (
        <img
          src={src}
          className={styles.userPic}
          alt="profile picture"
          onError={() => {
            setIsValid(false);
          }}></img>
      ) : (
        <img
          src={DefaultPicture.src}
          className={styles.userPic}
          alt="profile picture"></img>
      )}
    </>
  );
};

export default ProfilePictuer;
