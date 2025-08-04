import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Your backend URL
});

// Request interceptor to add auth token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (email, password) =>
    API.post("/auth/register", { email, password }),
  login: (email, password) => API.post("/auth/login", { email, password }),
  // Add other auth endpoints as needed
};

export default API;
