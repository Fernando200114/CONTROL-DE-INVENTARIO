import type { PaginatedResponse } from "../types/Pagination";

export interface DjangoUser {
  id: number;
  username: string;
  email: string;
  is_staff: boolean;
  password?: string; // Añadimos esto para que TS no se queje al enviar
}

const API_URL = "https://paredes-inventario-api.desarrollo-software.xyz/api/usuarios/";

// Función auxiliar para obtener el token
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { "Authorization": `Token ${token}` } : {}), // Formato Token de Django
  };
};

export const getUsuarios = async (): Promise<PaginatedResponse<DjangoUser>> => {
  const response = await fetch(API_URL, {
    headers: getAuthHeaders(), // También para leer, si la vista es protegida
  });
  if (!response.ok) throw new Error("Error al obtener usuarios");
  return response.json();
};

export const deleteUsuario = async (id: number) => {
  const response = await fetch(`${API_URL}${id}/`, { 
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Error al eliminar usuario");
  return response;
};

export const saveUsuario = async (id: number | null, data: any) => {
  const url = id ? `${API_URL}${id}/` : API_URL;
  const method = id ? "PUT" : "POST";
  
  const response = await fetch(url, {
    method,
    headers: getAuthHeaders(), // Envia el Token y el Content-Type
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error del servidor:", errorData);
    throw new Error(errorData.detail || "Error al guardar usuario");
  }
  
  return response.json();
};