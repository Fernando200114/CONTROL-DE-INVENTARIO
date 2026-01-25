import api from "./api"; 
import type { Producto } from "../types/Producto";
import type { PaginatedResponse } from "../types/Pagination";

export const getProductos = async (page: number = 1, search: string = "", categoria: string = ""): Promise<PaginatedResponse<Producto>> => {
  const res = await api.get("productos/", {
    params: {
      page: page,
      search: search,
      categoria: categoria // Asegúrate de que tu backend acepte este filtro
    }
  });
  return res.data;
};

export const saveProducto = async (id: number | null, data: FormData): Promise<Producto> => {
  if (id) {
    // PATCH es mucho más amigable con FormData en Django
    const res = await api.patch(`productos/${id}/`, data);
    return res.data;
  } else {
    const res = await api.post("productos/", data);
    return res.data;
  }
};

export const deleteProducto = async (id: number): Promise<void> => {
  await api.delete(`productos/${id}/`);
};