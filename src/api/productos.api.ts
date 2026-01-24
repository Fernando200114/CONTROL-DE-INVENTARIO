// src/api/productos.api.ts
import api from "./api"; // tu instancia de Axios
import type { Producto } from "../types/Producto";
import type { PaginatedResponse } from "../types/Pagination";

/**
 * Obtener todos los productos (con paginación)
 */
export const getProductos = async (): Promise<PaginatedResponse<Producto>> => {
  const res = await api.get("productos/");
  return res.data;
};

/**
 * Crear un nuevo producto
 */
export const createProducto = async (producto: Producto): Promise<Producto> => {
  const res = await api.post("productos/", producto);
  return res.data;
};

/**
 * Actualizar un producto existente por ID
 */
export const updateProducto = async (id: number, producto: Producto): Promise<Producto> => {
  const res = await api.put(`productos/${id}/`, producto);
  return res.data;
};

/**
 * Eliminar un producto por ID
 */
export const deleteProducto = async (id: number): Promise<void> => {
  await api.delete(`productos/${id}/`);
};
