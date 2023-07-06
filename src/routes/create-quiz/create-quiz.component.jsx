import { useState, useContext, useEffect, useRef } from "react";
import { v4 } from "uuid";
import { useLocation, useParams, useNavigate } from "react-router-dom";

import { CreateQuizContext } from "../../context/create-quiz.context";
import CreateQuizCard from "../../components/create-quiz-card/create-quiz-card.component";
import CreateQuizSideBar from "../../components/create-quiz-sideBar/create-quiz-sideBar.component";
import apis from "../../apis/auth.js";

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
  const {
    addQuestion,
    removeQuestion,
    selectedQuestion,
    setSelectedQuestion,
    setQuestions,
    questions,
  } = useContext(CreateQuizContext);

  const params = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, []);

  const convertDataToFitApi = (headerData) => {
    const quizObject = {};

    // Add the quiz name, creation date, duration, and close date to the quizObject
    quizObject.name = headerData.name;
    quizObject.creationDateTime = headerData.creationDateTime;
    quizObject.duration = parseInt(headerData.duration);
    quizObject.closeDate = headerData.closeDate;

    // Create an array of question objects
    const newquestions = questions
      .filter((question) => question.id !== "")
      .map((question) => {
        const questionObject = {};

        // Add the question text and options to the questionObject
        questionObject.text = question.question;
        questionObject.optionA = question.option1;
        questionObject.optionB = question.option2;
        questionObject.optionC = question.option3;
        questionObject.optionD = question.option4;

        // Set the value of correctAnswer based on the correct option for each question
        if (question.correctAns === "option1") {
          questionObject.correctAnswer = "a";
        } else if (question.correctAns === "option2") {
          questionObject.correctAnswer = "b";
        } else if (question.correctAns === "option3") {
          questionObject.correctAnswer = "c";
        } else if (question.correctAns === "option4") {
          questionObject.correctAnswer = "d";
        } else {
          questionObject.correctAnswer = "";
        }

        return questionObject;
      });

    // Add the questions array to the quizObject
    quizObject["questions"] = newquestions;

    return quizObject;
  };

  const convertDataToFormData = (quizObject) => {
    const formData = new FormData();

    // Add the quiz name, creation date, duration, and close date to the form data
    formData.append("name", quizObject.name);
    formData.append("creationDateTime", quizObject.creationDateTime);
    formData.append("duration", quizObject.duration);
    formData.append("closeDate", quizObject.closeDate);

    // Loop through the questions array and add each question to the form data
    quizObject.questions.forEach((question, index) => {
      const questionPrefix = `questions[${index}]`;

      // Add the question text and options to the form data
      formData.append(`${questionPrefix}[text]`, question.text);
      formData.append(`${questionPrefix}[optionA]`, question.optionA);
      formData.append(`${questionPrefix}[optionB]`, question.optionB);
      formData.append(`${questionPrefix}[optionC]`, question.optionC);
      formData.append(`${questionPrefix}[optionD]`, question.optionD);

      // Add the correct answer to the form data
      formData.append(
        `${questionPrefix}[correctAnswer]`,
        question.correctAnswer
      );
    });

    return formData;
  };

  const handleCreateQuiz = async () => {
    const pinCode = params.pin_code;
    const headerData = state.headerData;

    const data = convertDataToFormData(convertDataToFitApi(headerData));

    console.log(data);

    try {
      const response = await apis.createQuizWithData(data, pinCode);

      console.log(response);

      if (response.status === 200) {
        setSelectedQuestion({ ...defaultQuizField });
        setQuestions([{ ...defaultQuizField }]);
        navigate(`/classroom/${pinCode}`);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

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

    if (quizField.correctAns === "") {
      alert("provide the correct answer");
      return;
    }
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
          handleCreateQuiz={handleCreateQuiz}
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
