export const convertAnswersToFormat = (answers, questions) => {
  const questionsAnswerList = answers.map((answer, index) => {
    return {
      id: questions[index].id,
      answer: answer,
    };
  });
  // console.log(questionsAnswerList);

  const data = { questionsAnswerList };
  // data["questionsAnswerList"] = questionsAnswerList;

  return data;
};
