import { useState, useContext } from "react";
import { v4 } from "uuid";

import { CreateQuizContext } from "../../context/create-quiz.context";
import QuestionInput from "../../components/question-input/question-input.component";
import QuestionArea from "../../components/quetion-area/quetion-area.component";

import "./create-quiz.styles.css";

const defaultQuizField = {
  id: "",
  question: "",
  option1: "",
  option2: "",
  option3: "",
  option4: "",
  correctAns: "",
};

const CreateQuiz = () => {
  const [quizField, setQuizField] = useState(defaultQuizField);
  const { question, option1, option2, option3, option4, correctAns } =
    quizField;

  const { questions, addQuestion, removeQuestion } =
    useContext(CreateQuizContext);

  const handelRemoveQuestion = () => {
    removeQuestion(quizField);
  };

  const resetQuizFields = () => {
    setQuizField(defaultQuizField);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setQuizField({ ...quizField, [name]: value });
  };

  const handleDoubleClick = (event) => {
    const { name } = event.target;
    quizField["correctAns"] = name;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    quizField["id"] = v4();

    addQuestion(quizField);
    resetQuizFields();
  };
  return (
    <div className="container-for-quiz-page">
      <div className="create-quiz-container">
        <div className="create-quiz-sidebar">
          <span>side bare will be here</span>
        </div>

        <div className="create-quiz-main-area">
          <div className="main-area-header">
            <h2 className="quiz-name">Create Quiz</h2>
            <button className="quiz-buttons"> create quiz </button>
          </div>
          <div className="create-qution-card">
            <div className="main-area-header">
              <h2 className="quiz-question">Question</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <QuestionArea
                label="Type your question here"
                type="text"
                required
                onChange={handleChange}
                name="question"
                value={question}
              />

              <div>
                <span className="create-quiz-hint-text">
                  To mark an option as correct, simply double-click on it.
                </span>

                <div className="answer-options">
                  <div className="answer-option">
                    <QuestionInput
                      label="Answer A"
                      type="text"
                      required
                      onChange={handleChange}
                      style={{ backgroundColor: "#f5f5f5" }}
                      onDoubleClick={handleDoubleClick}
                      name="option1"
                      value={option1}
                    />
                  </div>
                  <div className="answer-option">
                    <QuestionInput
                      label="Answer B"
                      type="text"
                      required
                      onChange={handleChange}
                      style={{ backgroundColor: "#f8dabb" }}
                      onDoubleClick={handleDoubleClick}
                      name="option2"
                      value={option2}
                    />
                  </div>

                  <div className="answer-option">
                    <QuestionInput
                      label="Answer C (optional)"
                      type="text"
                      onChange={handleChange}
                      style={{ backgroundColor: "#fdfcdf" }}
                      onDoubleClick={handleDoubleClick}
                      name="option3"
                      value={option3}
                    />
                  </div>
                  <div className="answer-option">
                    <QuestionInput
                      label="Answer D (optional)"
                      type="text"
                      onChange={handleChange}
                      style={{ backgroundColor: "#c4d6e8" }}
                      onDoubleClick={handleDoubleClick}
                      name="option4"
                      value={option4}
                    />
                  </div>
                </div>
              </div>
              <button>save question</button>
              <button type="button" onClick={handelRemoveQuestion}>
                remove question
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz;
