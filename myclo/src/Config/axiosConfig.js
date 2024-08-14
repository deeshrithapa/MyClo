import axios from "axios";
import config from "./config";

const axiosInstance = axios.create({
  baseURL: config.baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("Token:", token); // Check if the token is correct
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; 
      // Ensure that the Authorization header includes 'Bearer '
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
