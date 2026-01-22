import { useEffect, useState } from "react";
import ClientForm from "../components/ClientForm";
import ClientTable from "../components/ClientTable";
import type { ClientFormData } from "../components/ClientForm";
import {
  getClientes,
  createCliente,
  updateCliente,
  deleteCliente,
} from "../api/clientes.api";

export interface Cliente extends ClientFormData {
  id: number;
}

const Clientes = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [selected, setSelected] = useState<Cliente | null>(null);

  const loadClientes = async () => {
    const data = await getClientes();
    setClientes(data);
  };

  useEffect(() => {
    loadClientes();
  }, []);

  const handleSave = async (data: ClientFormData) => {
    if (selected) {
      await updateCliente(selected.id, data);
      setSelected(null);
    } else {
      await createCliente(data);
    }
    loadClientes();
  };

  const handleDelete = async (id: number) => {
    if (confirm("¿Eliminar cliente?")) {
      await deleteCliente(id);
      loadClientes();
    }
  };

  return (
    <>
      <h2>Clientes</h2>

      <ClientForm onSave={handleSave} selected={selected} />

      <ClientTable
        clientes={clientes}
        onEdit={setSelected}
        onDelete={handleDelete}
      />
    </>
  );
};

export default Clientes;
