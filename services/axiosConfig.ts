import axios from "axios";

export const apiConnection = axios.create({
  baseURL: process.env.connection_url,
  timeout: 5000,
  withCredentials: true,
});
