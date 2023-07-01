import React from "react";
import styles from "./Card.module.css";
import { useNavigate } from "react-router-dom";

function Card({ ClassRoom }) {
  const navigate = useNavigate();
  
  const handleClassRoom = async () => {
    navigate(`/classroom?pin_code=${ClassRoom.id}`);
  };
  return (
    <div className={styles.container}>
      <p className={styles.gameName}>{ClassRoom.name}</p>
      <div className={styles.buttonContainer}>
        <button
          className={styles.fillButton}
          style={{ width: "118px", height: "32px" }}
          onClick={handleClassRoom}
        >
          View
        </button>
      </div>
    </div>
  );
}

export default Card;
