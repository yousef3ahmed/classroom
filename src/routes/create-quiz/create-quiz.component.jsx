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
    <div>
      {/* <div>
          <span>qution in side</span>
  </div>*/}

      <div>
        <h2>MY first Quiz</h2>
        <button> save quiz </button>
      </div>
      <form onSubmit={handleSubmit}>
        <QuestionArea
          label="enter your question"
          type="text"
          required
          onChange={handleChange}
          name="question"
          value={question}
        />

        <div>
          <span>To mark an option as correct, simply double-click on it.</span>

          <div>
            <div>
              <QuestionInput
                label="option 1"
                type="text"
                required
                onChange={handleChange}
                onDoubleClick={handleDoubleClick}
                name="option1"
                value={option1}
              />
              <QuestionInput
                label="option 2"
                type="text"
                required
                onChange={handleChange}
                name="option2"
                value={option2}
              />
            </div>
            <div>
              <QuestionInput
                label="option 3"
                type="text"
                onChange={handleChange}
                name="option3"
                value={option3}
              />
              <QuestionInput
                label="option 4"
                type="text"
                onChange={handleChange}
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
  );
};

export default CreateQuiz;
