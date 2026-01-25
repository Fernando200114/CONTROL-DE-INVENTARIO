import api from "./api";
import type { Proveedor } from "../types/Proveedor";
import type { PaginatedResponse } from "../types/Pagination";

export const getProveedores = async (): Promise<PaginatedResponse<Proveedor>> => {
  const res = await api.get("proveedores/");
  return res.data;
};

export const saveProveedor = async (id: number | null, data: Omit<Proveedor, 'id'>): Promise<Proveedor> => {
  if (id) {
    const res = await api.patch(`proveedores/${id}/`, data);
    return res.data;
  } else {
    const res = await api.post("proveedores/", data);
    return res.data;
  }
};

export const deleteProveedor = async (id: number): Promise<void> => {
  await api.delete(`proveedores/${id}/`);
};