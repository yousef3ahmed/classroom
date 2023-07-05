import { useState, useContext, useEffect, useRef } from "react";
import { v4 } from "uuid";

import { CreateQuizContext } from "../../context/create-quiz.context";
import CreateQuizCard from "../../components/create-quiz-card/create-quiz-card.component";
import CreateQuizSideBar from "../../components/create-quiz-sideBar/create-quiz-sideBar.component";

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
  const formRef = useRef(null);
  const { addQuestion, removeQuestion, selectedQuestion, setSelectedQuestion } =
    useContext(CreateQuizContext);

  useEffect(() => {
    quizField["id"] = selectedQuestion.id;
    quizField["question"] = selectedQuestion.question;
    quizField["option1"] = selectedQuestion.option1;
    quizField["option2"] = selectedQuestion.option2;
    quizField["option3"] = selectedQuestion.option3;
    quizField["option4"] = selectedQuestion.option4;
    quizField["correctAns"] = selectedQuestion.correctAns;

    setQuizField({ ...quizField });
  }, [selectedQuestion]);

  const resetQuizFields = () => {
    setQuizField({ ...defaultQuizField });
  };

  const handelRemoveQuestion = () => {
    if (quizField.id !== "") {
      removeQuestion(quizField);
      resetQuizFields();
      setSelectedQuestion({ ...defaultQuizField });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setQuizField({ ...quizField, [name]: value });
  };

  const handleDoubleClick = (event) => {
    const { name } = event.target;
    setQuizField({ ...quizField, ["correctAns"]: name });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(quizField);
    if (quizField["id"] === "") {
      quizField["id"] = v4();

      addQuestion(quizField);
      resetQuizFields();
      setSelectedQuestion({ ...defaultQuizField });
      addQuestion(defaultQuizField);
    } else {
      if (
        selectedQuestion.id === quizField.id &&
        selectedQuestion.question === quizField.question &&
        selectedQuestion.option1 === quizField.option1 &&
        selectedQuestion.option2 === quizField.option2 &&
        selectedQuestion.option3 === quizField.option3 &&
        selectedQuestion.option4 === quizField.option4 &&
        selectedQuestion.correctAns === quizField.correctAns
      ) {
        setSelectedQuestion({ ...defaultQuizField });
      } else {
        addQuestion(quizField);
        setSelectedQuestion({ ...quizField });
      }
    }
  };

  const handleAddQution = async () => {
    await formRef.current.click();
  };

  return (
    <div className="container-for-quiz-page">
      <div className="create-quiz-container">
        <CreateQuizSideBar handleAddQution={handleAddQution} />
        <CreateQuizCard
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handelRemoveQuestion={handelRemoveQuestion}
          handleDoubleClick={handleDoubleClick}
          formRef={formRef}
          quizField={quizField}
        />
      </div>
    </div>
  );
};

export default CreateQuiz;
