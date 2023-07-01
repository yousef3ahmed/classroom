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
        'Content-Type': "application/json",
      },
    };
    return await axios.get(`${apiServer}/classrooms/owned`, config);
  },


  createClassRoom: async ( data ) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': "application/json",
      },
    };
    return await axios.post(`${apiServer}/classrooms`, data ,config);
  },

};
