import React from "react";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate();
  const handleCreateGame = () => {
    navigate("/create-classroom");
  };
  return (
    <div className={styles.container}>
      <span className={styles.header}>My Dashboard</span>
      <button className={styles.fillButton} onClick={handleCreateGame}>
        Create a New ClassRoom
      </button>
    </div>
  );
}

export default Header;