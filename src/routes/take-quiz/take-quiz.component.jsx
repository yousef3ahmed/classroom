import { useState, useEffect, Fragment } from "react";

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

  const fetchData = async () => {
    try {
      const response = await apis.takeQuiz(pin_code, quiz_id);
      console.log(response.status);
      if (response.status === 200) {
        setQuizQuestions(response.data.questions);
      } else {
        alert(`error in fetching data`);
        console.log("fail");
        navigate(`/classroom/${pin_code}`);
      }
    } catch (error) {
      alert(error.response.data);
      navigate(`/classroom/${pin_code}`);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const submitQuestionData = async (questionIndex, selectedAnswer) => {
    try {
      const data = {
        id: quizQuestions[questionIndex].id,
        answer: selectedAnswer,
      };
      const response = await apis.submitQuestion(
        quiz_id,
        quizQuestions[questionIndex].id,
        data
      );
      console.log(response.data);
      if (response.status === 200) {
        console.log("done");
      } else {
        console.log("fail");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChooseAns = (questionIndex, selectedAnswer) => {
    setUserAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[questionIndex] = selectedAnswer;
      return newAnswers;
    });
  };

  const endQuizData = async () => {
    try {
      const data = convertAnswersToFormat(userAnswers, quizQuestions);
      const response = await apis.endQuiz(quiz_id, data);
      console.log(response.data);
      if (response.status === 200) {
        alert(`quiz submited successfully ${response.data}`);
        navigate(`/classroom/${pin_code}`);
      } else {
        alert(`error in submit your ${response.data}`);
        console.log("fail");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (
      quizQuestions.length !== 0 &&
      currentQuestionIndex === quizQuestions.length
    ) {
      setQuizFinished(true);
      endQuizData();
      console.log(userAnswers);
    } else {
      if (quizQuestions.length)
        handleChooseAns(
          currentQuestionIndex,
          quizQuestions[currentQuestionIndex].lastAnswer
        );
      const interval = setInterval(() => {
        if (userAnswers[currentQuestionIndex])
          submitQuestionData(
            currentQuestionIndex,
            userAnswers[currentQuestionIndex]
          );
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

  return (
    <div className="container-for-quiz-page">
      <div className="take-quiz-container">
        {quizFinished ? (
          <h2>Quiz finished you can show your grade after quize deadline!</h2>
        ) : quizQuestions[currentQuestionIndex] ? (
          <TakeQuizCard
            key={currentQuestionIndex}
            quizField={quizQuestions[currentQuestionIndex]}
            currentQuestionIndex={currentQuestionIndex}
            handleChooseAns={handleChooseAns}
            userAnswers={userAnswers}
          />
        ) : (
          <h2>Please Wait</h2>
        )}
      </div>
    </div>
  );
};

export default TakeQize;
