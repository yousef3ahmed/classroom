import axios from "axios";

export const apiServer = 'https://classroom-api.onrender.com';

export default {
  login: async (data) => {
    return await axios.post("https://classroom-api.onrender.com/auth/authenticate", data);
  },

  signup: async (data) => {
    return await axios.post("https://classroom-api.onrender.com/auth/register", data);
  },

};
