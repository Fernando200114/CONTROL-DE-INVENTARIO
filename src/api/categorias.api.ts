import api from "./api";
import type { PaginatedResponse } from "../types/Pagination";

export interface Categoria {
  id: number;
  nombre: string;
  descripcion?: string | null;
}

// Obtener todas las categorías
export const getCategorias = async (): Promise<PaginatedResponse<Categoria>> => {
  const res = await api.get("categorias/");
  return res.data;
};

/**
 * Guardar o Editar Categoría
 * Django espera 'nombre' y 'descripcion'
 */
export const saveCategoria = async (id: number | null, data: { nombre: string; descripcion: string }): Promise<Categoria> => {
  if (id) {
    // Actualización parcial con PATCH
    const res = await api.patch(`categorias/${id}/`, data);
    return res.data;
  } else {
    // Creación con POST
    const res = await api.post("categorias/", data);
    return res.data;
  }
};

// Eliminar categoría
export const deleteCategoria = async (id: number): Promise<void> => {
  await api.delete(`categorias/${id}/`);
};