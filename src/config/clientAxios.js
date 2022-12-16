import axios from "axios";

const clientAxios = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
});

// Todo: configurar interceptores

clientAxios.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  return config;
});
export default clientAxios;
