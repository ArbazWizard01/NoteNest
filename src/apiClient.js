import axios from "axios";

export const apiClient = axios.create({
    baseURL: 'https://notenest-backend-g25c.onrender.com/',
    timeout: 2000,
  });
  