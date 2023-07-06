import React from "react";
import styles from "./Card.module.css";
import { useNavigate, useParams } from "react-router-dom";

function Card({ ClassRoom }) {
  const navigate = useNavigate();
  const params = useParams();

  const handleClassRoom = async () => {
    const pinCode = params.pin_code;
    const quizId = ClassRoom.id;
    navigate(`/classrooms/${pinCode}/TakeQize/${quizId}`);
    // navigate(`/classroom?pin_code=${ClassRoom.id}`);
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
          Start
        </button>
      </div>
    </div>
  );
}

export default Card;
