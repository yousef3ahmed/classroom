import { useContext, useState, useEffect, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import QuizSideBarItem from "../quiz-sidebar-item/quiz-sidebar-item.component";
import { CreateQuizContext } from "../../context/create-quiz.context";

import "./create-quiz-sideBar.component.css";

const CreateQuizSideBar = ({ handleAddQution }) => {
  const { questions } = useContext(CreateQuizContext);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const handleResize = () => {
    setIsSmallScreen(window.innerWidth <= 1050);
  };
  useEffect(() => {
    setIsSmallScreen(window.innerWidth <= 1050);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Fragment>
      <div
        className={`create-quiz-sidebar-container ${
          showSidebar ? "show" : ""
        } ${isSmallScreen ? "absolute" : ""}`}
      >
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
      </div>
      <button className="sidebar-toggle-button" onClick={toggleSidebar}>
        <i>
          <FontAwesomeIcon icon={faBars} className="menu-icon" />
        </i>
      </button>
    </Fragment>
  );
};

export default CreateQuizSideBar;
