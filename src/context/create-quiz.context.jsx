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

  return [...questions, { ...quizQuestionToAdd }];
};

const removeQuizQuestion = (questions, quizQuestiontToRemove) => {
  return questions.filter(
    (question) => question.id !== quizQuestiontToRemove.id
  );
};

// as the actual value you want to access
export const CreateQuizContext = createContext({
  questions: [],
  addQuestion: () => null,
  removeQuestion: () => null,
});

export const CreateQuizProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    console.log(questions);
  }, [questions]);

  const addQuestion = (quizQuestionToAdd) => {
    setQuestions(addQuizQuestion(questions, quizQuestionToAdd));
  };

  const removeQuestion = (quizQuestiontToRemove) => {
    setQuestions(removeQuizQuestion(questions, quizQuestiontToRemove));
  };

  const value = { questions, addQuestion, removeQuestion };

  return (
    <CreateQuizContext.Provider value={value}>
      {children}
    </CreateQuizContext.Provider>
  );
};
