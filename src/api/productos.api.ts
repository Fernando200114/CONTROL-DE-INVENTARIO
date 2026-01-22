import axios from "axios";
import type { Producto } from "../types/Producto";

const API_URL = "https://paredes-inventario-api.desarrollo-software.xyz/api/productos/";

export const getProductos = async (): Promise<Producto[]> => {
  const res = await axios.get(API_URL);
  return res.data.results;
};

export const createProducto = async (data: Omit<Producto, "id">): Promise<Producto> => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

export const updateProducto = async (id: number, data: Omit<Producto, "id">): Promise<Producto> => {
  const res = await axios.put(`${API_URL}${id}/`, data);
  return res.data;
};

export const deleteProducto = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}${id}/`);
};
