import axios from "axios";


export const apiClient = axios.create({
  baseURL: "https://notenest-backend-g25c.onrender.com",
  timeout: 2000,
});

// export const getPrediction = async (text) => {
//   try {
//     const response = await apiClient.post("/", { userInput: text });
//     return response.data.response;
//   } catch (error) {
//     console.error("Error fetching AI prediction:", error);
//     return null;
//   }
// };
