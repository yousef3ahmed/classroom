import React from "react";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const params = useParams();
  const pinCode = params.pin_code;

  const handleCreateGame = () => {
    navigate(`/classroom/${pinCode}/add-quiz`);
  };

  const handleAddMail = () => {
    navigate(`/classroom/${pinCode}/add-mail`);
  };

  return (
    <div className={styles.container}>
      <span className={styles.header}>My Quizzes</span>

      <div>
        <button className={styles.fillButton} onClick={handleCreateGame}>
          Create a New Quiz
        </button>

        <button className={styles.fillButton} onClick={handleAddMail}>
          Add Mail
        </button>
      </div>
    </div>
  );
}

export default Header;
