// src/api/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://paredes-inventario-api.desarrollo-software.xyz/api/",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); 
    
    if (token) {
      // CAMBIO AQUÍ: Usamos "Token" en lugar de "Bearer"
      config.headers.Authorization = `Token ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;