import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const registerUserAPI = (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};
