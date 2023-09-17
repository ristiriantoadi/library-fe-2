import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = "http://localhost:8000";
axios.headers = { Accept: "application/json" };

const publicAxios = axios.create({});

const privateAxios = axios.create({});
privateAxios.interceptors.request.use(
  (config) => {
    // Modify the request configuration before it is sent
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);
privateAxios.interceptors.response.use(
  (response) => {
    // Modify the response data or perform any other post-processing
    return response;
  },
  (error) => {
    // Handle response errors
    console.log("error", error);
    toast.error(error.response.data.detail, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    if (error.response.status == 401) window.location.href = "/login";
    return Promise.reject(error);
  }
);

export { publicAxios, privateAxios };
