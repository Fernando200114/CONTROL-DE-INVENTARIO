import { useEffect, useState } from "react";

export interface ClientFormData {
  nombre: string;
  email: string;
  telefono: string;
}

import type { Cliente } from "../pages/Clientes";

interface Props {
  onSave: (data: ClientFormData) => void;
  selected?: Cliente | null;
}

const ClientForm = ({ onSave, selected }: Props) => {
  const [form, setForm] = useState<ClientFormData>({
    nombre: "",
    email: "",
    telefono: "",
  });

  useEffect(() => {
    if (selected) setForm(selected);
  }, [selected]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    setForm({ nombre: "", email: "", telefono: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Nombre" value={form.nombre}
        onChange={e => setForm({ ...form, nombre: e.target.value })} />

      <input placeholder="Email" value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })} />

      <input placeholder="Teléfono" value={form.telefono}
        onChange={e => setForm({ ...form, telefono: e.target.value })} />

      <button type="submit">Guardar</button>
    </form>
  );
};

export default ClientForm;
