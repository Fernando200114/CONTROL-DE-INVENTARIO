import { useEffect, useState, useRef } from "react";
import type { Producto } from "../types/Producto";
import { getCategorias, type Categoria } from "../api/categorias.api";

// Definimos la interfaz para el estado interno del formulario
export interface ProductFormData {
  nombre: string;
  precio: number;
  stock: number;
  cantidad_minima: number;
  unidad: string;
  categoria: number;
  imagen: File | null; // Agregamos imagen al estado
}

interface Props {
  onSave: (data: FormData) => void; // El padre espera FormData
  selected?: Producto | null;
  onCancel: () => void;
}

const ProductForm = ({ onSave, selected, onCancel }: Props) => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<ProductFormData>({
    nombre: "",
    precio: 0,
    stock: 0,
    cantidad_minima: 0,
    unidad: "unidades",
    categoria: 0,
    imagen: null,
  });

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await getCategorias();
        setCategorias(res.results);
        if (!selected && res.results.length > 0) {
          setForm(prev => ({ ...prev, categoria: res.results[0].id }));
        }
      } catch (error) {
        console.error("Error cargando categorías:", error);
      }
    };
    fetchCategorias();
  }, [selected]);

  useEffect(() => {
    if (selected) {
      setForm({
        nombre: selected.nombre,
        precio: selected.precio,
        stock: selected.stock,
        cantidad_minima: selected.cantidad_minima,
        unidad: selected.unidad,
        categoria: selected.categoria,
        imagen: null,
      });
      setPreview(selected.imagen || null);
    } else {
      setForm({ nombre: "", precio: 0, stock: 0, cantidad_minima: 0, unidad: "unidades", categoria: 0, imagen: null });
      setPreview(null);
    }
  }, [selected]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm({ ...form, imagen: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.categoria === 0) return alert("Por favor selecciona una categoría");

    // CREACIÓN DEL FORMDATA (Esto soluciona el error de tipos)
    const formData = new FormData();
    formData.append("nombre", form.nombre);
    formData.append("precio", String(form.precio));
    formData.append("stock", String(form.stock));
    formData.append("cantidad_minima", String(form.cantidad_minima));
    formData.append("unidad", form.unidad);
    formData.append("categoria", String(form.categoria));
    
    if (form.imagen) {
      formData.append("imagen", form.imagen);
    }

    onSave(formData);
  };

  const inputStyle = "w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white focus:border-cyan-500 outline-none transition-all";
  const labelStyle = "block text-xs font-medium text-slate-400 mb-1 ml-1";

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      {/* SECCIÓN IZQUIERDA: IMAGEN */}
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 rounded-xl p-4 bg-slate-900/30">
        <label className={labelStyle}>Imagen del Producto</label>
        <div className="relative w-full h-48 bg-slate-800 rounded-lg overflow-hidden mb-4 flex items-center justify-center">
          {preview ? (
            <img src={preview} alt="Vista previa" className="w-full h-full object-cover" />
          ) : (
            <span className="text-slate-500 text-xs">Sin imagen</span>
          )}
        </div>
        <input 
          type="file" 
          accept="image/*" 
          ref={fileInputRef} 
          onChange={handleImageChange} 
          className="hidden" 
        />
        <button 
          type="button" 
          onClick={() => fileInputRef.current?.click()}
          className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-white text-xs rounded-lg transition-colors"
        >
          {preview ? "Cambiar Imagen" : "Subir Imagen"}
        </button>
      </div>

      {/* SECCIÓN DERECHA: CAMPOS */}
      <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className={labelStyle}>Nombre del Producto</label>
          <input
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            required
            className={inputStyle}
          />
        </div>

        <div>
          <label className={labelStyle}>Categoría</label>
          <select
            value={form.categoria}
            onChange={(e) => setForm({ ...form, categoria: Number(e.target.value) })}
            required
            className={inputStyle}
          >
            <option value={0} disabled>Seleccione...</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.nombre}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelStyle}>Precio Venta ($)</label>
          <input
            type="number"
            step="0.01"
            value={form.precio}
            onChange={(e) => setForm({ ...form, precio: Number(e.target.value) })}
            required
            className={inputStyle}
          />
        </div>

        <div>
          <label className={labelStyle}>Stock Inicial</label>
          <input
            type="number"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
            required
            className={inputStyle}
          />
        </div>

        <div>
          <label className={labelStyle}>Unidad</label>
          <select
            value={form.unidad}
            onChange={(e) => setForm({ ...form, unidad: e.target.value })}
            className={inputStyle}
          >
            <option value="unidades">Unidades</option>
            <option value="kg">Kilogramos</option>
            <option value="litros">Litros</option>
          </select>
        </div>

        {/* Botones */}
        <div className="sm:col-span-2 flex justify-end gap-3 mt-4 pt-4 border-t border-slate-700">
          <button type="button" onClick={onCancel} className="px-6 py-2 text-slate-400 hover:text-white">
            Cancelar
          </button>
          <button type="submit" className="px-8 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition-all">
            {selected ? "💾 Actualizar" : "➕ Guardar"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;