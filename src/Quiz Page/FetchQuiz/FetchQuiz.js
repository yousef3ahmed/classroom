import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import styles from "./FetchQuiz.module.css";
import apis from "../../apis/auth";
import LoadingForHoem from "../../components/Loading/Loading For Home/LoadingForHoem";
import { useLocation, useParams } from "react-router-dom";

function FetchQuiz() {
  const [quiz, setQuiz] = useState();
  const [isLoading, setisLoading] = useState(true);

  const params = useParams();
  const pinCode = params.pin_code;

  useEffect(() => {
    setisLoading(true);
    console.log(pinCode);
    apis
      .getQuizs(pinCode)
      .then((response) => {
        const result = response.data;
        console.log(result);
        setQuiz(response.data);
        setisLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setisLoading(false);
      });
  }, []);

  return isLoading ? (
    <LoadingForHoem />
  ) : (
    <>
      <section className={styles.gameContainer} style={{ marginTop: "20px" }}>
        {quiz.map(
          (onequiz) =>
            onequiz.name && <Card key={onequiz.id} ClassRoom={onequiz} />
        )}
      </section>
    </>
  );
}

export default FetchQuiz;
