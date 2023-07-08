import axios from "axios";

// export const apiServer = 'https://classroom-api.onrender.com';
export const apiServer = "http://localhost:8080";

export default {
  login: async (data) => {
    return await axios.post(`${apiServer}/auth/authenticate`, data);
  },

  signup: async (data) => {
    return await axios.post(`${apiServer}/auth/register`, data);
  },

  ownedClassRoom: async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    return await axios.get(`${apiServer}/classrooms/owned`, config);
  },

  createClassRoom: async (data) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    return await axios.post(`${apiServer}/classrooms`, data, config);
  },

  getQuizs: async (pinCode) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    return await axios.get(
      `${apiServer}/admin/classrooms/${pinCode}/quizzes`,
      config
    );
  },

  createQuiz: async (data, pinCode) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    return await axios.post(
      `${apiServer}/admin/classrooms/${pinCode}/quizzes`,
      data,
      config
    );
  },

  createQuizWithData: async (data, pinCode) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    return await axios.post(
      `${apiServer}/admin/classrooms/${pinCode}/quizzes/with-questions`,
      data,
      config
    );
  },

  takeQuiz: async (pinCode, quizId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    return await axios.post(
      `${apiServer}/classrooms/${pinCode}/quizzes/${quizId}/take`,
      {},
      config
    );
  },

  submitQuiz: async (quizId, data) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    return await axios.post(
      `${apiServer}/classrooms/quizzes/${quizId}/submit`,
      data,
      config
    );
  },

  endQuiz: async (quizId, data) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    return await axios.post(
      `${apiServer}/classrooms/quizzes/${quizId}/end`,
      data,
      config
    );
  },

  submitQuestion: async (quizId, questionId, data) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    return await axios.post(
      `${apiServer}/classrooms/quizzes/${quizId}/submit/${questionId}`,
      data,
      config
    );
  },
};
