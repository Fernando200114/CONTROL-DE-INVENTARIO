// src/api/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://paredes-inventario-api.desarrollo-software.xyz/api/", // URL de tu backend Django
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
