import type { Cliente } from "../types/Cliente";
import type { ClientFormData } from "../components/ClientForm";

const API_URL = "https://paredes-inventario-api.desarrollo-software.xyz/api/clientes/";

export const getClientes = async (): Promise<Cliente[]> => {
  const res = await fetch(API_URL);
  const data = await res.json();
  return data.results;
};

export const createCliente = async (cliente: ClientFormData): Promise<Cliente> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cliente),
  });

  if (!res.ok) {
    throw new Error("Error al crear cliente");
  }

  return res.json();
};
