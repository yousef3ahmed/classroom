import { useState, useEffect, Fragment } from "react";

import QUIZ_DATA from "./dummy-quize";
import TakeQuizCard from "../../components/take-quiz-card/take-quiz-card.component";
import apis from "../../apis/auth.js";

import { convertAnswersToFormat } from "./format-converter.js";

import { useParams, useNavigate } from "react-router";

import "./taske-quiz.styles.css";

const TakeQize = () => {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  const { pin_code, quiz_id } = useParams();
  const navigate = useNavigate();
  /**

"
 */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apis.takeQuiz(pin_code, quiz_id);
        console.log(response.data.questions);
        if (response.status === 200) {
          setQuizQuestions(response.data.questions);
        } else {
          alert(`error in fetch data ${response.data}`);
          console.log("fail");
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (
      quizQuestions.length !== 0 &&
      currentQuestionIndex === quizQuestions.length
    ) {
      setQuizFinished(true);
      const data = convertAnswersToFormat(userAnswers, quizQuestions);
      const submithData = async () => {
        try {
          const response = await apis.submitQuiz(quiz_id, data);
          console.log(response.data);
          if (response.status === 200) {
            alert(`quiz submited successfully ${response.data}`);
          } else {
            alert(`error in submit your ${response.data}`);
            console.log("fail");
          }
        } catch (error) {
          console.log(error.message);
        }
      };
      submithData();
      console.log(userAnswers);
    } else {
      // setQuizFinished(false);
      const interval = setInterval(() => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [currentQuestionIndex, quizQuestions]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, []);

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
              key={currentQuestionIndex}
              quizField={quizQuestions[currentQuestionIndex]}
              currentQuestionIndex={currentQuestionIndex}
              handleChooseAns={handleChooseAns}
              userAnswers={userAnswers}
            />
          )
        )}
      </div>
    </div>
  );
};

export default TakeQize;
