import React from "react";
import styles from "./Loading.module.css";

const LoadingPage = () => {
  return (
    <div className={styles["loading-container"]}>
      <div className={styles["loading-spinner"]} />
    </div>
  );
};

export default LoadingPage;
