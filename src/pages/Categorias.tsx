import React, { useEffect, useState } from "react";
import { getCategorias, saveCategoria, deleteCategoria, type Categoria } from "../api/categorias.api";
import { Plus, Trash2, Edit2, FileText, X, Package } from "lucide-react";

const Categorias = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // --- LÓGICA DE PERMISOS ---
  const isAdmin = localStorage.getItem("is_staff") === "true";

  const loadCategorias = async () => {
    try {
      const res = await getCategorias();
      setCategorias(res.results);
    } catch (error) {
      console.error("Error al cargar categorías:", error);
    }
  };

  useEffect(() => {
    loadCategorias();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim()) return alert("El nombre es obligatorio");

    try {
      setLoading(true);
      await saveCategoria(editingId, { 
        nombre: nombre, 
        descripcion: descripcion || "" 
      });
      
      cancelEdit();
      loadCategorias();
    } catch (error) {
      console.error(error);
      alert("Hubo un error al guardar la categoría");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (cat: Categoria) => {
    setEditingId(cat.id);
    setNombre(cat.nombre);
    setDescripcion(cat.descripcion || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setNombre("");
    setDescripcion("");
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de eliminar esta categoría?")) return;
    try {
      await deleteCategoria(id);
      loadCategorias();
    } catch (error) {
      alert("No se pudo eliminar la categoría");
    }
  };

  return (
    <div className="container mx-auto p-6 text-white max-w-5xl">
      <header className="mb-8 border-b border-slate-700 pb-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Package className="text-cyan-500" size={32} />
          Gestión de Categorías
        </h1>
        <span className="text-xs bg-slate-800 text-cyan-400 px-3 py-1 rounded-full border border-cyan-500/30 font-mono">
          TOTAL: {categorias.length}
        </span>
      </header>

      {/* --- SOLO ADMIN VE EL FORMULARIO --- */}
      {isAdmin && (
        <section className="mb-10 bg-slate-900/50 p-6 rounded-2xl border border-slate-800 shadow-xl transition-all">
          <h2 className="text-lg font-semibold mb-4 text-cyan-400">
            {editingId ? "Actualizar Categoría" : "Nueva Categoría"}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-slate-400 ml-1">Nombre</label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej: Belleza, Electrónica..."
                  className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-slate-100"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-slate-400 ml-1">Descripción (Opcional)</label>
                <input
                  type="text"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  placeholder="Breve descripción de los productos..."
                  className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-slate-100"
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              {editingId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-slate-700 text-slate-400 hover:bg-slate-800 transition-all"
                >
                  <X size={18} /> Cancelar
                </button>
              )}
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-cyan-600 text-white font-bold hover:bg-cyan-500 active:scale-95 disabled:opacity-50 transition-all shadow-lg shadow-cyan-900/20"
              >
                {editingId ? <Edit2 size={18} /> : <Plus size={18} />}
                {loading ? "Procesando..." : editingId ? "Actualizar" : "Crear Categoría"}
              </button>
            </div>
          </form>
        </section>
      )}

      {/* --- GRID DE CATEGORÍAS (Visible para todos) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categorias.length > 0 ? (
          categorias.map((cat) => (
            <div 
              key={cat.id} 
              className="bg-slate-800/30 border border-slate-700 p-5 rounded-2xl hover:border-cyan-500/50 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
                    {cat.nombre}
                  </h3>
                  
                  {/* --- SOLO ADMIN VE ACCIONES DE FILA --- */}
                  {isAdmin && (
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleEdit(cat)} 
                        className="p-1.5 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all"
                        title="Editar"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(cat.id)} 
                        className="p-1.5 text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                        title="Eliminar"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-slate-400 text-sm flex items-start gap-2 leading-relaxed">
                  <FileText size={14} className="mt-1 shrink-0 text-slate-500" />
                  {cat.descripcion || <span className="italic opacity-40">Sin descripción</span>}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-800 rounded-3xl">
            <p className="text-slate-500">No se encontraron categorías.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categorias;