import axios from "axios";
import config from "./config";

const BACKEND_URI: string = config.BACKEND_URI;

export const api = axios.create({
  baseURL: BACKEND_URI,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});
