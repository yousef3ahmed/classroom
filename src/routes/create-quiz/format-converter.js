export const convertDataToFitApi = (headerData, questions) => {
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

export const convertDataToFormData = (quizObject) => {
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
    formData.append(`${questionPrefix}[correctAnswer]`, question.correctAnswer);
  });

  return formData;
};
