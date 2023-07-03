import { createContext, useState, useEffect } from "react";

const addQuizQuestion = (questions, quizQuestionToAdd) => {
  const existingQuestion = questions.find(
    (question) => question.id === quizQuestionToAdd.id
  );

  if (existingQuestion) {
    return questions.map((question) =>
      question.id === quizQuestionToAdd.id ? quizQuestionToAdd : question
    );
  }

  if (questions && questions[questions.length - 1].id === "") {
    questions[questions.length - 1].id = quizQuestionToAdd.id;
    questions[questions.length - 1].question = quizQuestionToAdd.question;
    questions[questions.length - 1].option1 = quizQuestionToAdd.option1;
    questions[questions.length - 1].option2 = quizQuestionToAdd.option2;
    questions[questions.length - 1].option3 = quizQuestionToAdd.option3;
    questions[questions.length - 1].option4 = quizQuestionToAdd.option4;
    questions[questions.length - 1].correctAns = quizQuestionToAdd.correctAns;

    return [...questions];
  }

  return [...questions, { ...quizQuestionToAdd }];
};

const removeQuizQuestion = (questions, quizQuestiontToRemove) => {
  return questions.filter(
    (question) => question.id !== quizQuestiontToRemove.id
  );
};

const defaultQuizField = {
  id: "",
  question: "",
  option1: "",
  option2: "",
  option3: "",
  option4: "",
  correctAns: "",
};

// as the actual value you want to access
export const CreateQuizContext = createContext({
  questions: [],
  addQuestion: () => null,
  removeQuestion: () => null,
  selectedQuestion: {},
  setSelectedQuestion: () => null,
});

export const CreateQuizProvider = ({ children }) => {
  const [selectedQuestion, setSelectedQuestion] = useState(defaultQuizField);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (questions.length === 0) {
      setQuestions([{ ...defaultQuizField }]);
    }

    // console.log(questions);
  }, [questions]);

  const addQuestion = (quizQuestionToAdd) => {
    setQuestions(addQuizQuestion(questions, quizQuestionToAdd));
  };

  const removeQuestion = (quizQuestiontToRemove) => {
    setQuestions(removeQuizQuestion(questions, quizQuestiontToRemove));
  };

  const value = {
    questions,
    addQuestion,
    removeQuestion,
    selectedQuestion,
    setSelectedQuestion,
  };

  return (
    <CreateQuizContext.Provider value={value}>
      {children}
    </CreateQuizContext.Provider>
  );
};
