import { useEffect, useState } from "react";
import { UserCircle, Mail, Phone, Trash2, Edit2, X } from "lucide-react";
import { getClientes, saveCliente, deleteCliente } from "../api/clientes.api";
import type { Cliente } from "../types/Cliente";
import ClientForm from "../components/ClientForm";

const Clientes = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [selected, setSelected] = useState<Cliente | null>(null);
  const [, setLoading] = useState(false);

  const isAdmin = localStorage.getItem("is_staff") === "true";

  const loadClientes = async () => {
    try {
      setLoading(true);
      const data = await getClientes();
      setClientes(data);
    } catch (error) {
      console.error("Error al cargar clientes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadClientes(); }, []);

  const handleSave = async (data: any) => {
    try {
      await saveCliente(selected?.id || null, data);
      setSelected(null);
      loadClientes();
    } catch (error) {
      alert("Error al procesar el cliente. Verifica si el email ya existe.");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("¿Eliminar cliente? Esto podría afectar su acceso al sistema.")) {
      await deleteCliente(id);
      loadClientes();
    }
  };

  return (
    <div className="container mx-auto p-6 text-white max-w-6xl">
      <header className="mb-8 border-b border-slate-700 pb-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <UserCircle className="text-cyan-500" size={32} /> Clientes del Sistema
        </h1>
      </header>

      {/* FORMULARIO (SOLO ADMIN) */}
      {isAdmin && (
        <section className="mb-10 bg-slate-900/50 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-cyan-400">
              {selected ? "Modificar Datos de Cliente" : "Registrar Nuevo Cliente"}
            </h2>
            {selected && (
              <button onClick={() => setSelected(null)} className="text-slate-500 hover:text-white">
                <X size={20} />
              </button>
            )}
          </div>
          <ClientForm
            onSave={handleSave}
            selected={selected}
            onCancel={() => setSelected(null)} // 👈 Agregado para que funcione el reset
          />
        </section>
      )}

      {/* LISTADO DE CLIENTES EN CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clientes.map((c) => (
          <div key={c.id} className="bg-slate-800/30 border border-slate-700 p-6 rounded-2xl hover:border-cyan-500/50 transition-all group relative">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-cyan-500/10 p-3 rounded-xl border border-cyan-500/20 text-cyan-500 group-hover:scale-110 transition-transform">
                <UserCircle size={24} />
              </div>

              {isAdmin && (
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                  <button onClick={() => { setSelected(c); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(c.id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg">
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            </div>

            <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tight">{c.nombre}</h3>

            <div className="space-y-2">
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <Mail size={14} className="text-cyan-600" /> {c.email}
              </div>
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <Phone size={14} className="text-cyan-600" /> {c.telefono}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-700/50 flex justify-between items-center text-[10px] font-mono text-slate-500">
              <span>USER ID: {c.user || 'N/A'}</span>
              <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-cyan-500/50">ID: {c.id}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clientes;