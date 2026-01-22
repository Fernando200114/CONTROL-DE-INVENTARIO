import { useEffect, useState } from "react";
import type { Producto } from "../types/Producto";

export interface ProductFormData {
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
}

interface Props {
  onSave: (data: ProductFormData) => void;
  selected?: Producto | null;
}

const ProductForm = ({ onSave, selected }: Props) => {
  const [form, setForm] = useState<ProductFormData>({
    nombre: "",
    categoria: "",
    precio: 0,
    stock: 0,
  });

  useEffect(() => {
    if (selected) {
      setForm({
        nombre: selected.nombre,
        categoria: selected.categoria,
        precio: selected.precio,
        stock: selected.stock,
      });
    }
  }, [selected]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    setForm({ nombre: "", categoria: "", precio: 0, stock: 0 });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
      <input
        name="nombre"
        placeholder="Nombre"
        value={form.nombre}
        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
      />

      <input
        name="categoria"
        placeholder="Categoría"
        value={form.categoria}
        onChange={(e) => setForm({ ...form, categoria: e.target.value })}
      />

      <input
        name="precio"
        type="number"
        placeholder="Precio"
        value={form.precio}
        onChange={(e) => setForm({ ...form, precio: Number(e.target.value) })}
      />

      <input
        name="stock"
        type="number"
        placeholder="Stock"
        value={form.stock}
        onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
      />

      <button type="submit">Guardar</button>
    </form>
  );
};

export default ProductForm;
