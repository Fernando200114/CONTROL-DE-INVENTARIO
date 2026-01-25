import api from "./api";

export const getClientes = async () => {
  const res = await api.get("clientes/");
  // Si tu backend devuelve paginación ("results"), extraemos los datos
  return res.data.results || res.data;
};

export const saveCliente = async (id: number | null, data: any) => {
  if (id) {
    // Para actualizar (PUT/PATCH): Usamos la estructura que ya vimos en tu GET
    const res = await api.patch(`clientes/${id}/`, {
      nombre: data.nombre,
      email: data.email,
      telefono: data.telefono
    });
    return res.data;
  } else {
    // PARA REGISTRO NUEVO (POST):
    // Estructuramos el payload para que no haya confusión en el backend
    const payload = {
      username: data.email, 
      email: data.email,
      password: data.password,
      nombre: data.nombre,      // 👈 Este debe llenar el campo "nombre" de tu JSON
      first_name: data.nombre,  // 👈 Respaldo para el objeto User de Django
      telefono: data.telefono
    };
    
    const res = await api.post("auth/registro_cliente/", payload);
    return res.data;
  }
};

export const deleteCliente = async (id: number) => {
  await api.delete(`clientes/${id}/`);
};