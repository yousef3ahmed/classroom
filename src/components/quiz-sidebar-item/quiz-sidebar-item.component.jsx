import { useContext } from "react";

import { CreateQuizContext } from "../../context/create-quiz.context";

import "./quiz-sidebar-item.styles.css";

const QuizSideBarItem = ({ myquestion }) => {
  const { setSelectedQuestion } = useContext(CreateQuizContext);

  const { question, option1, option2, option3, option4, correctAns } =
    myquestion;
  const handeCardClick = () => {
    setSelectedQuestion({ ...myquestion });
    console.log(myquestion);
  };

  return (
    <div className="blueprint-container small" onClick={handeCardClick}>
      <div className="blueprint-container-header">
        <span>Question</span>
      </div>
      <div className="blueprint-container-question">
        <div>
          <span>{question !== "" ? question : "Type Your question here"}</span>
        </div>
      </div>
      <div className="blueprint-container-options">
        <div className="blueprint-container-option">
          <span>{option1 !== "" ? option1 : "Answer A"}</span>
        </div>
        <div className="blueprint-container-option">
          <span>{option2 !== "" ? option2 : "Answer B"}</span>
        </div>
        <div className="blueprint-container-option">
          <span>{option3 !== "" ? option3 : "Answer C (optional)"}</span>
        </div>
        <div className="blueprint-container-option">
          <span>{option4 !== "" ? option4 : "Answer D (optional)"}</span>
        </div>
      </div>
    </div>
  );
};

export default QuizSideBarItem;
