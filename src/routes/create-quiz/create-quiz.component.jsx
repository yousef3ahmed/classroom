import { useState, useContext, useEffect, useRef } from "react";
import { v4 } from "uuid";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { CreateQuizContext } from "../../context/create-quiz.context";
import CreateQuizCard from "../../components/create-quiz-card/create-quiz-card.component";
import CreateQuizSideBar from "../../components/create-quiz-sideBar/create-quiz-sideBar.component";
import apis from "../../apis/auth.js";
import {
  convertDataToFitApi,
  convertDataToFitApiWithoutHeader,
  convertDataToFitMyCode,
  getNewQuestions,
  getUpdateQuestions,
} from "./format-converter.js";

import "./create-quiz.styles.css";
const defaultQuizField = {
  id: "",
  question: "",
  option1: "",
  option2: "",
  option3: "",
  option4: "",
  correctAns: "",
  questionStatus: "new",
};
/*
questionStatus (old, new, update)
*/

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

  const { pin_code, stat } = useParams();
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

  const fetchQuestions = async () => {
    if (stat === "1") {
      const quizId = state.headerData.quizId;
      try {
        const response = await apis.getQuiz(pin_code, quizId);
        console.log(response.status);
        if (response.status === 200) {
          if (response.data) {
            console.log(response.data.questions);
            const questionsData = convertDataToFitMyCode(
              response.data.questions
            );
            console.log(questionsData);
            setQuestions([...questionsData, { ...defaultQuizField }]);
          }
        } else {
          // alert(`error in fetching data`);
          toast.error(
            <div>
              error in fetching data <br />
              try again
            </div>,
            {
              autoClose: 5000,
            }
          );
          console.log("fail");
          navigate(`/classroom/${pin_code}`);
        }
      } catch (error) {
        // alert(error.response.data);
        toast.error(
          <div>
            error in { error.response.data } <br />
            try again
          </div>,
          {
            autoClose: 5000,
          }
        );
        navigate(`/classroom/${pin_code}`);
        console.log(error);
      }
    }
  };

  const addQuestions = async (questionToAdd) => {
    if (stat === "1") {
      const quizId = state.headerData.quizId;
      const { id, ...newquestionToAdd } = questionToAdd;
      try {
        const response = await apis.addQuestion(
          pin_code,
          quizId,
          newquestionToAdd
        );
        console.log(response);
        if (response.status === 200) {
          console.log("done");
        } else {
          console.log("fail");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const updateQuestions = async (questionToupdate) => {
    if (stat === "1") {
      const quizId = state.headerData.quizId;
      const { id, ...newquestionToupdate } = questionToupdate;
      try {
        const response = await apis.UpdateQuestion(
          pin_code,
          quizId,
          questionToupdate.id,
          newquestionToupdate
        );
        console.log(response);
        if (response.status === 200) {
          console.log("done");
        } else {
          console.log("fail");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleCreateQuiz = async () => {
    const headerData = state.headerData;
    if (stat === "0") {
      const data = convertDataToFitApi(headerData, questions);
      console.log(data);
      try {
        const response = await apis.createQuizWithData(data, pin_code);

        console.log(response);

        if (response.status === 200) {
          setSelectedQuestion({ ...defaultQuizField });
          setQuestions([{ ...defaultQuizField }]);
          navigate(`/classroom/${pin_code}`);
        } else {
          console.log(response);
        }
      } catch (error) {
        console.log(error.message);
      }
    } else if (stat === "1") {
      const newQuestionsToAdd = convertDataToFitApiWithoutHeader(
        getNewQuestions(questions)
      );
      const updatedQuestionsToAdd = convertDataToFitApiWithoutHeader(
        getUpdateQuestions(questions)
      );

      console.log(newQuestionsToAdd);
      newQuestionsToAdd.forEach(async (questiontoAdd) => {
        console.log(questiontoAdd);
        await addQuestions(questiontoAdd);
      });

      console.log(updatedQuestionsToAdd);
      updatedQuestionsToAdd.forEach(async (questiontoupdate) => {
        console.log(questiontoupdate);
        await updateQuestions(questiontoupdate);
      });
      setSelectedQuestion({ ...defaultQuizField });
      setQuestions([{ ...defaultQuizField }]);
      navigate(`/classroom/${pin_code}`);
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
      // alert("provide the correct answer");
      toast.error(
        <div>
          please provide the correct answer 
        </div>,
        {
          autoClose: 5000,
        }
      );
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
          stat={stat}
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
