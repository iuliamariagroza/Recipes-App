import axios from "axios";

export const baseURL =
  "http://ec2-13-51-254-7.eu-north-1.compute.amazonaws.com";
// export const baseURL = "http://localhost:80";

const api = axios.create({
  baseURL: "/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
