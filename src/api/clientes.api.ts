import axios from "axios";

const API_URL = "https://paredes-inventario-api.desarrollo-software.xyz/api/clientes/";

export const getClientes = async () => {
  const res = await axios.get(API_URL);
  return res.data.results;
};

export const createCliente = async (data: any) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

// 🆕 EDITAR
export const updateCliente = async (id: number, data: any) => {
  const res = await axios.put(`${API_URL}${id}/`, data);
  return res.data;
};

// 🆕 ELIMINAR
export const deleteCliente = async (id: number) => {
  await axios.delete(`${API_URL}${id}/`);
};
