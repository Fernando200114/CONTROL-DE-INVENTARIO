import { useEffect, useState } from "react";
import type { Cliente } from "../types/Cliente";
import { Save, X, Lock } from "lucide-react"; // Añadimos Lock para el icono si lo usas

export interface ClientFormData {
  nombre: string;
  email: string;
  telefono: string;
  password?: string; // 👈 Campo opcional para la contraseña
}

interface Props {
  onSave: (data: ClientFormData) => void;
  selected?: Cliente | null;
  onCancel: () => void;
}

const ClientForm = ({ onSave, selected, onCancel }: Props) => {
  const [form, setForm] = useState<ClientFormData>({
    nombre: "",
    email: "",
    telefono: "",
    password: "", // 👈 Estado inicial
  });

  useEffect(() => {
    if (selected) {
      setForm({
        nombre: selected.nombre,
        email: selected.email,
        telefono: selected.telefono,
        password: "", // No editamos password aquí
      });
    } else {
      setForm({ nombre: "", email: "", telefono: "", password: "" });
    }
  }, [selected]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.email.trim()) return alert("Nombre y Email obligatorios");
    
    // Si es nuevo, validar que puso contraseña
    if (!selected && !form.password) return alert("La contraseña es obligatoria para nuevos clientes");
    
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Nombre */}
        <input
          type="text" placeholder="Nombre"
          className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 outline-none focus:border-cyan-500 transition-all text-slate-100"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          required
        />

        {/* Email */}
        <input
          type="email" placeholder="Email (será el usuario)"
          className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 outline-none focus:border-cyan-500 transition-all text-slate-100"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        {/* Teléfono */}
        <input
          type="text" placeholder="Teléfono"
          className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 outline-none focus:border-cyan-500 transition-all text-slate-100"
          value={form.telefono}
          onChange={(e) => setForm({ ...form, telefono: e.target.value })}
        />

        {/* CONTRASEÑA (Solo visible si no hay selección / Creación) */}
        {!selected && (
          <input
            type="password"
            placeholder="Contraseña de acceso"
            className="bg-slate-900 border border-cyan-900/50 rounded-xl px-4 py-2.5 outline-none focus:border-cyan-500 transition-all text-slate-100"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        )}
      </div>

      <div className="flex justify-end gap-2 mt-4">
        {selected && (
          <button type="button" onClick={onCancel} className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-slate-700 text-slate-400 hover:bg-slate-800 transition-all">
            <X size={18} /> Cancelar
          </button>
        )}
        <button type="submit" className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-cyan-600 text-white font-bold hover:bg-cyan-500 active:scale-95 transition-all shadow-lg shadow-cyan-900/20">
          <Save size={18} />
          {selected ? "Actualizar" : "Registrar con Usuario"}
        </button>
      </div>
    </form>
  );
};

export default ClientForm;