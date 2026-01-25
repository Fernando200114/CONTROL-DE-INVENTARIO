import { useEffect, useState } from "react";
import type { Producto } from "../types/Producto";
import { getProductos, deleteProducto, saveProducto } from "../api/productos.api";
import { getCategorias, type Categoria } from "../api/categorias.api";
import ProductForm from "../components/ProductForm";
import { Package } from "lucide-react";

const Productos = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<Producto | null>(null);

  // Estados para Filtros y Paginación Local
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const isAdmin = localStorage.getItem("is_staff") === "true";

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      // Traemos todos los productos (la paginación la haremos en el cliente)
      const response = await getProductos();
      setProductos(response.results);

      const catRes = await getCategorias();
      setCategorias(catRes.results);
    } catch (error) {
      console.error("Error cargando datos:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- LÓGICA DE FILTRADO Y PAGINACIÓN LOCAL ---

  // 1. Primero filtramos la lista completa según la búsqueda y categoría
  const filteredProducts = productos.filter((p) => {
    // 1. Buscamos por nombre (insensible a mayúsculas)
    const matchesSearch = p.nombre.toLowerCase().includes(search.toLowerCase());

    // 2. Comparamos la categoría:
    // Si el filtro está vacío, pasan todos.
    // Si no, convertimos el ID a número para que coincida con el tipo de p.categoria
    const matchesCategory = catFilter === "" || p.categoria === Number(catFilter);

    return matchesSearch && matchesCategory;
  });

  // 2. Calculamos los índices para la página actual basados en la lista filtrada
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // 3. Cortamos la lista para mostrar solo los 10 que corresponden
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  // Resetear a página 1 si el usuario filtra o busca
  useEffect(() => {
    setCurrentPage(1);
  }, [search, catFilter]);

  const handleSave = async (formData: FormData) => {
    try {
      await saveProducto(editing?.id || null, formData);
      setEditing(null);
      loadData();
    } catch (error) {
      alert("Error al guardar");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar producto?")) return;
    await deleteProducto(id);
    loadData();
  };

  return (
    <div className="container mx-auto p-6 text-white">
      <header className="mb-8 border-b border-slate-700 pb-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold flex justify-between items-center gap-3">
          <Package className="text-cyan-500" size={32} />
          Gestión de Inventario
        </h1>
        <span className="text-xs bg-slate-800 text-cyan-400 px-3 py-1 rounded-full border border-cyan-500/30">
          TOTAL: {filteredProducts.length}
        </span>
      </header>

      {isAdmin && (
        <section className="mb-10 bg-slate-800/40 p-6 rounded-2xl border border-slate-700 shadow-xl">
          <h2 className="text-xl font-semibold mb-6 text-cyan-400">
            {editing ? `Editando: ${editing.nombre}` : "Añadir Nuevo Producto"}
          </h2>
          <ProductForm onSave={handleSave} selected={editing} onCancel={() => setEditing(null)} />
        </section>
      )}

      {/* BARRA DE FILTROS */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 bg-slate-900/50 p-5 rounded-2xl border border-slate-800 shadow-inner">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="🔍 Buscar por nombre..."
            className="w-full pl-4 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-cyan-500 outline-none transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="md:w-72">
          <select
            className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-cyan-500 outline-none cursor-pointer text-slate-300"
            value={catFilter}
            onChange={(e) => setCatFilter(e.target.value)}
          >
            <option value="">Todas las Categorías</option>
            {categorias.map(c => (
              <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
          </select>
        </div>
      </div>

      <section>
        {loading ? (
          <div className="flex justify-center py-20 text-cyan-500 animate-pulse">Cargando...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentItems.map((p) => (
                <div key={p.id} className="bg-slate-900/70 rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition-all overflow-hidden flex flex-col group shadow-lg">
                  {/* Imagen */}
                  <div className="h-44 overflow-hidden bg-slate-800 relative">
                    {p.imagen ? (
                      <img src={p.imagen} alt={p.nombre} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-600 text-xs italic">Sin imagen</div>
                    )}
                  </div>

                  <div className="p-5 flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] bg-cyan-900/30 text-cyan-400 px-2 py-0.5 rounded uppercase tracking-wider font-bold border border-cyan-800/50">
                        {p.categoria_nombre}
                      </span>
                      <span className="text-lg font-bold text-white">${p.precio}</span>
                    </div>

                    <h3 className="font-bold text-slate-100 mb-4 line-clamp-2 h-10">{p.nombre}</h3>

                    <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800 pt-3">
                      <p>Stock: <span className={p.stock <= p.cantidad_minima ? "text-red-400 font-bold" : "text-emerald-400"}>{p.stock} {p.unidad}</span></p>
                    </div>

                    {isAdmin && (
                      <div className="flex gap-2 mt-4 pt-4 border-t border-slate-800">
                        <button
                          onClick={() => { setEditing(p); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                          className="flex-1 bg-blue-600/10 text-blue-400 py-2 rounded-lg text-xs font-bold hover:bg-blue-600 hover:text-white transition-all border border-blue-600/20"
                        >EDITAR</button>
                        <button
                          onClick={() => handleDelete(p.id!)}
                          className="bg-red-500/10 text-red-500 px-3 py-2 rounded-lg text-xs font-bold hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
                        >BORRAR</button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* CONTROLES DE PAGINACIÓN LOCAL */}
            <div className="flex justify-center items-center gap-6 mt-12 pb-10">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="px-6 py-2 bg-slate-900 border border-slate-800 rounded-xl hover:border-cyan-500 disabled:opacity-30 transition-all shadow-lg"
              >
                ← Anterior
              </button>

              <div className="flex items-center gap-2">
                <span className="text-cyan-500 font-bold">{currentPage}</span>
                <span className="text-slate-600">/</span>
                <span className="text-slate-400">{totalPages}</span>
              </div>

              <button
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="px-6 py-2 bg-slate-900 border border-slate-800 rounded-xl hover:border-cyan-500 disabled:opacity-30 transition-all shadow-lg"
              >
                Siguiente →
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Productos;