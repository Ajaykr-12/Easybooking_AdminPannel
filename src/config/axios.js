import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://easybooking-server.onrender.com/api",
  withCredentials: true,
});

export const axiosImgUpload = axios.create({
  baseURL: "https://easybooking-server.onrender.com/api",
});

export default axiosInstance;
