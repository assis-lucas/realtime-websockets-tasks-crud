import axios from "axios";

if (!process.env.REACT_APP_BACKEND_URL) {
  throw new Error("Backend URL is not found on your .env!");
}

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

export default api;
