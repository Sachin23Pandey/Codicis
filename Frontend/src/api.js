

import axios from "axios";

const API = axios.create({
  baseURL: "https://codicis.onrender.com",
});

export const executeCode = async (language, sourceCode) => {
  const response = await API.post("/execute", {
    language,
    sourceCode,
  });

  return response.data;
};