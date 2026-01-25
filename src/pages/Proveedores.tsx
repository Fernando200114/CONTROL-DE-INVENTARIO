import { useEffect, useState } from "react";
import { getProveedores, saveProveedor, deleteProveedor } from "../api/proveedores.api";
import type { Proveedor } from "../types/Proveedor";
import ProveedorForm from "../components/ProveedorForm";
import { Trash2, Edit2, Phone, Mail, Truck } from "lucide-react";

const Proveedores = () => {
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Verificamos si el usuario es administrador
  const isAdmin = localStorage.getItem("is_staff") === "true";

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await getProveedores();
      setProveedores(res.results);
    } catch (error) {
      console.error("Error al cargar proveedores:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async (data: Omit<Proveedor, "id">) => {
    try {
      await saveProveedor(editingId, data);
      setEditingId(null);
      loadData();
    } catch (error) {
      alert("Error al procesar la solicitud");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar este proveedor de forma permanente?")) return;
    try {
      await deleteProveedor(id);
      loadData();
    } catch (error) {
      alert("No se pudo eliminar el proveedor");
    }
  };

  const selectedProveedor = proveedores.find((p) => p.id === editingId) || null;

  return (
    <div className="container mx-auto p-6 text-white max-w-6xl">
      <header className="mb-8 border-b border-slate-700 pb-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Truck className="text-cyan-500" size={32} /> Gestion de Proveedores
        </h1>
        <div className="text-xs bg-slate-800 text-cyan-400 px-3 py-1 rounded-full border border-cyan-500/30 font-mono">
          TOTAL: {proveedores.length}
        </div>
      </header>

      {/* FORMULARIO (SOLO ADMIN) */}
      {isAdmin && (
        <section className="mb-10 bg-slate-900/50 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <h2 className="text-lg font-semibold mb-4 text-cyan-400">
            {editingId ? "Actualizar Datos de Proveedor" : "Registrar Proveedor"}
          </h2>
          <ProveedorForm 
            onSave={handleSave} 
            selected={selectedProveedor} 
            onCancel={() => setEditingId(null)} 
          />
        </section>
      )}

      {/* LISTADO DE PROVEEDORES */}
      <section>
        {loading && proveedores.length === 0 ? (
          <div className="flex justify-center py-20 text-cyan-500 animate-pulse font-bold">
            Cargando proveedores...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {proveedores.map((p) => (
              <div 
                key={p.id} 
                className="bg-slate-800/30 border border-slate-700 p-6 rounded-2xl hover:border-cyan-500/50 transition-all group relative flex flex-col justify-between h-full"
              >
                {/* Indicador lateral Cyberpunk */}
                <div className="absolute top-0 left-0 w-1 h-full bg-cyan-600 opacity-0 group-hover:opacity-100 transition-all"></div>

                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors uppercase truncate pr-4">
                      {p.nombre}
                    </h3>
                    
                    {isAdmin && (
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all shrink-0">
                        <button 
                          onClick={() => { setEditingId(p.id); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                          className="p-1.5 text-blue-400 hover:bg-blue-400/10 rounded-lg"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(p.id)}
                          className="p-1.5 text-red-400 hover:bg-red-400/10 rounded-lg"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-slate-400 group-hover:text-slate-200 transition-colors">
                      <div className="bg-slate-900 p-2 rounded-lg">
                        <Mail size={16} className="text-cyan-500" />
                      </div>
                      <span className="text-sm truncate">{p.email || "Sin correo"}</span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-slate-400 group-hover:text-slate-200 transition-colors">
                      <div className="bg-slate-900 p-2 rounded-lg">
                        <Phone size={16} className="text-cyan-500" />
                      </div>
                      <span className="text-sm">{p.telefono || "Sin teléfono"}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {proveedores.length === 0 && (
              <div className="col-span-full text-center py-20 text-slate-600 italic border-2 border-dashed border-slate-800 rounded-3xl">
                No hay proveedores en la base de datos.
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Proveedores;