

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
});

export const executeCode = async (language, sourceCode) => {
  const response = await API.post("/execute", {
    language,
    sourceCode,
  });

  return response.data;
};