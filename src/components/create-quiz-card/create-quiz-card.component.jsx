import QuestionArea from "../quetion-area/quetion-area.component";
import QuestionInput from "../question-input/question-input.component";

import "./create-quiz-card.styles.css";

const CreateQuizCard = ({
  handleSubmit,
  handleChange,
  handleCreateQuiz,
  handelRemoveQuestion,
  handleDoubleClick,
  formRef,
  quizField,
  stat,
}) => {
  const { question, option1, option2, option3, option4, correctAns } =
    quizField;
  return (
    <div className="create-quiz-main-area">
      <div className="main-area-header">
        <h2 className="quiz-name">
          {stat === 0 ? "Create Quiz" : "Update Quiz"}
        </h2>
        <button className="create-quiz-buttons" onClick={handleCreateQuiz}>
          {stat === 0 ? "Create" : "Update"}
        </button>
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
                style={
                  correctAns === "option1"
                    ? { backgroundColor: "green" }
                    : { backgroundColor: "#f5f5f5" }
                }
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
                style={
                  correctAns === "option2"
                    ? { backgroundColor: "green" }
                    : { backgroundColor: "#f8dabb" }
                }
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
                style={
                  correctAns === "option3"
                    ? { backgroundColor: "green" }
                    : { backgroundColor: "#fdfcdf" }
                }
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
                style={
                  correctAns === "option4"
                    ? { backgroundColor: "green" }
                    : { backgroundColor: "#c4d6e8" }
                }
                onDoubleClick={handleDoubleClick}
                name="option4"
                value={option4}
              />
            </div>
          </div>

          <div className="quiz-button-container">
            <button ref={formRef} type="submit" className="quiz-save-button">
              Save
            </button>
            <button
              className="quiz-remove-button"
              type="button"
              onClick={handelRemoveQuestion}
            >
              Remove
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateQuizCard;
