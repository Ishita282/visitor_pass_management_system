import axios from "axios";

// const BASE_URL = "https://visitor-pass-management-system-wnl4.onrender.com";
const BASE_URL = `${process.env.BASE_URL}`;
// const BASE_URL = "http://localhost:4000";

export const API_AUTH = axios.create({ baseURL: BASE_URL });
API_AUTH.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers["x-auth-token"] = token;
  return req;
});

export const API_PUBLIC = axios.create({ baseURL: BASE_URL });
