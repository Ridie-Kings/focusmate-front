import axios from "axios";

export const apiConnection = axios.create({
  baseURL: "http://localhost:4000/api",
  timeout: 5000,
  withCredentials: true,
});
