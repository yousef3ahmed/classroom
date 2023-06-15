import React from "react";
import styles from "./LoadingForHome.module.css";

const LoadingForHoem = () => {
  return (
    <div className={styles["loading-container"]}>
      <div className={styles["loading-spinner"]} />
    </div>
  );
};

export default LoadingForHoem;
