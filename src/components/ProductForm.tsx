import { useEffect, useState } from "react";
import type { Producto } from "../types/Producto";

export interface ProductFormData {
  nombre: string;
  precio: number;
  stock: number;
  cantidad_minima: number;
  unidad: string;
  categoria: number;
}

interface Props {
  onSave: (data: ProductFormData) => void;
  selected?: Producto | null;
}

const ProductForm = ({ onSave, selected }: Props) => {
  const [form, setForm] = useState<ProductFormData>({
    nombre: "",
    precio: 0,
    stock: 0,
    cantidad_minima: 0,
    unidad: "unidades",
    categoria: 0,
  });

  useEffect(() => {
    if (selected) {
      setForm({
        nombre: selected.nombre,
        precio: selected.precio,
        stock: selected.stock,
        cantidad_minima: selected.cantidad_minima,
        unidad: selected.unidad,
        categoria: selected.categoria,
      });
    }
  }, [selected]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="max-w-sm mx-auto bg-gradient-to-r from-blue-50 via-white to-purple-50 p-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          placeholder="Nombre"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          required
          className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="number"
          placeholder="Precio"
          value={form.precio}
          onChange={(e) => setForm({ ...form, precio: Number(e.target.value) })}
          required
          className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
          required
          className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="number"
          placeholder="Cantidad mínima"
          value={form.cantidad_minima}
          onChange={(e) =>
            setForm({ ...form, cantidad_minima: Number(e.target.value) })
          }
          className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <select
          value={form.unidad}
          onChange={(e) => setForm({ ...form, unidad: e.target.value })}
          className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="unidades">Unidades</option>
          <option value="kg">Kg</option>
          <option value="litros">Litros</option>
        </select>

        <input
          type="number"
          placeholder="ID Categoría"
          value={form.categoria}
          onChange={(e) => setForm({ ...form, categoria: Number(e.target.value) })}
          required
          className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Guardar
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
