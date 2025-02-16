import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:8000",
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
