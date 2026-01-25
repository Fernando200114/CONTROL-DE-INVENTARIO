import React, { useState, useEffect } from "react";
import type { Proveedor } from "../types/Proveedor";
import { X, Save } from "lucide-react";

interface Props {
  onSave: (data: Omit<Proveedor, "id">) => void;
  selected: Proveedor | null;
  onCancel: () => void;
}

const ProveedorForm = ({ onSave, selected, onCancel }: Props) => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
  });

  // Si seleccionamos uno para editar, cargamos sus datos
  useEffect(() => {
    if (selected) {
      setFormData({
        nombre: selected.nombre,
        email: selected.email || "",
        telefono: selected.telefono || "",
      });
    } else {
      setFormData({ nombre: "", email: "", telefono: "" });
    }
  }, [selected]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre.trim()) return alert("El nombre es obligatorio");
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-400 ml-1">Nombre de la Empresa</label>
          <input
            type="text"
            placeholder="Ej: Distribuidora Norte"
            className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 outline-none focus:border-cyan-500 transition-all text-white"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-400 ml-1">Correo Electrónico</label>
          <input
            type="email"
            placeholder="correo@empresa.com"
            className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 outline-none focus:border-cyan-500 transition-all text-white"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-400 ml-1">Teléfono</label>
          <input
            type="text"
            placeholder="+593 999..."
            className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 outline-none focus:border-cyan-500 transition-all text-white"
            value={formData.telefono}
            onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-4">
        {selected && (
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-slate-700 text-slate-400 hover:bg-slate-800 transition-all"
          >
            <X size={18} /> Cancelar
          </button>
        )}
        <button
          type="submit"
          className="bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-cyan-900/20"
        >
          <Save size={18} />
          {selected ? "Actualizar Proveedor" : "Guardar Proveedor"}
        </button>
      </div>
    </form>
  );
};

export default ProveedorForm;