import React from "react";
import styles from "./styles.module.css";

const DeleteAlert = ({ yesClick, noClick }) => {
  return (
    <div className={styles.deleteBg}>
      <div className={styles.alertWrapper}>
        <div className={styles.alertMessage}>
          <h2>CONFIRM DELETE ?</h2>
          <div className={styles.alertButtons}>
            <button onClick={yesClick} className={styles.yesBtn}>
              Yes
            </button>
            <button onClick={noClick} className={styles.noBtn}>
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAlert;
