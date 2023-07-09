import { useState, useEffect } from "react";

import QuestionInput from "../question-input/question-input.component";
import QuestionArea from "../quetion-area/quetion-area.component";
import QuizTimer from "../Timer-component/Timer.component";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";

import "./take-quiz-card.styles.css";
/*
 id
lastAnswer
optionA
optionB
optionC
optionD
text
 */
const TakeQuizCard = ({
  userAnswers,
  handleChooseAns,
  quizField,
  currentQuestionIndex,
}) => {
  const { text, optionA, optionB, optionC, optionD } = quizField;

  return (
    <div className="create-quiz-main-area">
      <div className="create-qution-card">
        <div className="main-area-header">
          <h2 className="quiz-question">Question {currentQuestionIndex + 1}</h2>
        </div>
        <div>
          <QuestionArea
            style={{ pointerEvents: "none" }}
            type="text"
            readOnly
            name="text"
            value={text}
          />

          <QuizTimer
            hasIcon
            timerIcon={<AccessAlarmIcon />}
            initialTime={9000}
            tickFrequency={1000}
          />

          <span className="create-quiz-hint-text">
            To mark an option as correct, simply click on it.
          </span>

          <div className="answer-options">
            <div className="answer-option">
              {optionA && (
                <QuestionInput
                  type="text"
                  style={
                    userAnswers[currentQuestionIndex] === "a"
                      ? { backgroundColor: "green" }
                      : { backgroundColor: "#f5f5f5" }
                  }
                  onClick={() => handleChooseAns(currentQuestionIndex, "a")}
                  readOnly
                  name="optionA"
                  value={optionA}
                />
              )}
            </div>
            <div className="answer-option">
              {optionB && (
                <QuestionInput
                  type="text"
                  style={
                    userAnswers[currentQuestionIndex] === "b"
                      ? { backgroundColor: "green" }
                      : { backgroundColor: "#f8dabb" }
                  }
                  onClick={() => handleChooseAns(currentQuestionIndex, "b")}
                  readOnly
                  name="optionB"
                  value={optionB}
                />
              )}
            </div>

            <div className="answer-option">
              {optionC && (
                <QuestionInput
                  type="text"
                  style={
                    userAnswers[currentQuestionIndex] === "c"
                      ? { backgroundColor: "green" }
                      : { backgroundColor: "#fdfcdf" }
                  }
                  onClick={() => handleChooseAns(currentQuestionIndex, "c")}
                  readOnly
                  name="optionC"
                  value={optionC}
                />
              )}
            </div>
            <div className="answer-option">
              {optionD && (
                <QuestionInput
                  type="text"
                  style={
                    userAnswers[currentQuestionIndex] === "d"
                      ? { backgroundColor: "green" }
                      : { backgroundColor: "#c4d6e8" }
                  }
                  onClick={() => handleChooseAns(currentQuestionIndex, "d")}
                  readOnly
                  name="optionD"
                  value={optionD}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TakeQuizCard;
