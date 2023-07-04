import { useState, useEffect, Fragment } from "react";

import QUIZ_DATA from "./dummy-quize";
import TakeQuizCard from "../../components/take-quiz-card/take-quiz-card.component";

import "./taske-quiz.styles.css";

const TakeQize = () => {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  useEffect(() => {
    setQuizQuestions(QUIZ_DATA);
  }, []);

  useEffect(() => {
    if (
      quizQuestions.length !== 0 &&
      currentQuestionIndex === quizQuestions.length
    ) {
      setQuizFinished(true);
      console.log(userAnswers);
    } else {
      // setQuizFinished(false);
      const interval = setInterval(() => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [currentQuestionIndex, quizQuestions]);

  const handleChooseAns = (questionIndex, selectedAnswer) => {
    setUserAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[questionIndex] = selectedAnswer;
      return newAnswers;
    });
  };

  return (
    <div className="container-for-quiz-page">
      <div className="take-quiz-container">
        {quizFinished ? (
          <h2>Quiz finished!</h2>
        ) : (
          quizQuestions[currentQuestionIndex] && (
            <TakeQuizCard
              quizField={quizQuestions[currentQuestionIndex]}
              currentQuestionIndex={currentQuestionIndex}
              handleChooseAns={handleChooseAns}
            />
            // {<h2>{quizQuestions[currentQuestionIndex].question}</h2>}
          )
        )}
      </div>
    </div>
  );
};

export default TakeQize;
