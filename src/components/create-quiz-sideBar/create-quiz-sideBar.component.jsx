import { useContext } from "react";

import QuizSideBarItem from "../quiz-sidebar-item/quiz-sidebar-item.component";
import { CreateQuizContext } from "../../context/create-quiz.context";

import "./create-quiz-sideBar.component.css";

const CreateQuizSideBar = ({ handleAddQution }) => {
  const { questions } = useContext(CreateQuizContext);
  return (
    <div className="create-quiz-sidebar">
      {questions.map((ques) => {
        return (
          <QuizSideBarItem
            key={ques.id}
            myquestion={ques}
            handleAddQution={handleAddQution}
          />
        );
      })}

      <button
        type="button"
        onClick={handleAddQution}
        className="add-new-card-button"
      >
        Add Question
      </button>
    </div>
  );
};

export default CreateQuizSideBar;
