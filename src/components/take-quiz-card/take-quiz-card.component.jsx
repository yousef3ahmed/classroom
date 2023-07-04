import { useState, useEffect } from "react";

import QuestionInput from "../question-input/question-input.component";
import QuestionArea from "../quetion-area/quetion-area.component";
import QuizTimer from "../Timer-component/Timer.component";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";

import "./take-quiz-card.styles.css";

const TakeQuizCard = ({ handleChooseAns, quizField, currentQuestionIndex }) => {
  const { question, option1, option2, option3, option4 } = quizField;

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
            name="question"
            value={question}
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
              <QuestionInput
                type="text"
                style={{ backgroundColor: "#f5f5f5" }}
                onClick={() => handleChooseAns(currentQuestionIndex, "option1")}
                readOnly
                name="option1"
                value={option1}
              />
            </div>
            <div className="answer-option">
              <QuestionInput
                type="text"
                style={{ backgroundColor: "#f8dabb" }}
                onClick={() => handleChooseAns(currentQuestionIndex, "option2")}
                readOnly
                name="option2"
                value={option2}
              />
            </div>

            <div className="answer-option">
              <QuestionInput
                type="text"
                style={{ backgroundColor: "#fdfcdf" }}
                onClick={() => handleChooseAns(currentQuestionIndex, "option3")}
                readOnly
                name="option3"
                value={option3}
              />
            </div>
            <div className="answer-option">
              <QuestionInput
                type="text"
                style={{ backgroundColor: "#c4d6e8" }}
                onClick={() => handleChooseAns(currentQuestionIndex, "option4")}
                readOnly
                name="option4"
                value={option4}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TakeQuizCard;
