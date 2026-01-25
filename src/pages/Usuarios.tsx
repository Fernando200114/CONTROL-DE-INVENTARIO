import { useEffect, useState } from "react";
import { getUsuarios, deleteUsuario, saveUsuario, type DjangoUser } from "../api/usuarios.api";
import UserForm from "../components/UserForm";
import type { UserFormData } from "../components/UserForm";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState<DjangoUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [editing, setEditing] = useState<DjangoUser | null>(null);

  // --- LÓGICA DE PERMISOS ---
  const isAdmin = localStorage.getItem("is_staff") === "true";

  const loadUsuarios = async () => {
    try {
      setLoading(true);
      const response = await getUsuarios();
      setUsuarios(response?.results ?? []);
    } catch (error) {
      console.error("ERROR AL CARGAR USUARIOS:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsuarios();
  }, []);

  const handleStartEdit = (user: DjangoUser) => {
    setEditing(user);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSave = async (data: UserFormData) => {
    try {
      const djangoData: any = {
        username: data.nombre,
        email: data.email,
        is_staff: data.rol === "Admin",
      };

      if (data.password && data.password.trim() !== "") {
        djangoData.password = data.password;
      }

      await saveUsuario(editing?.id || null, djangoData);

      setEditing(null);
      loadUsuarios();
      alert(editing ? "¡Usuario actualizado!" : "¡Usuario creado!");
    } catch (error) {
      alert("Error: El nombre de usuario ya existe o los datos son inválidos.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar usuario?")) return;
    try {
      await deleteUsuario(id);
      setUsuarios(usuarios.filter((u) => u.id !== id));
    } catch (error) {
      alert("Error al eliminar");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Gestión de Usuarios</h1>

      {/* 1. Formulario: Solo visible para Administradores */}
      {isAdmin && (
        <section className="mb-10 bg-slate-800/40 p-6 rounded-xl border border-slate-700">
          <h2 className="text-xl font-semibold mb-4 text-cyan-400">
            {editing
              ? `Editando el usuario -> ${editing.username}`
              : "Crear Nuevo Usuario"}
          </h2>

          <UserForm
            onSave={handleSave}
            initialData={
              editing
                ? {
                    nombre: editing.username,
                    email: editing.email,
                    rol: editing.is_staff ? "Admin" : "Usuario",
                  }
                : undefined
            }
            onCancel={() => setEditing(null)}
          />
        </section>
      )}

      {/* Lista estilo Cards */}
      <section>
        <div className="flex items-center justify-between mb-4 border-b border-slate-700 pb-2">
          <h2 className="text-xl font-semibold">Lista Activa</h2>
          {!isAdmin && (
            <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">
              Modo lectura
            </span>
          )}
        </div>

        {loading ? (
          <p className="text-slate-400">Cargando...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {usuarios.map((u) => (
              <div
                key={u.id}
                className="bg-slate-900/70 p-5 rounded-2xl shadow-lg border border-slate-800 hover:border-cyan-500/50 transition-all"
              >
                <h3 className="font-bold text-white text-lg mb-1">
                  {u.username}
                </h3>
                <p className="text-slate-400 text-sm mb-1">
                  {u.email || "Sin correo"}
                </p>
                <span
                  className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md ${
                    u.is_staff
                      ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                      : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  }`}
                >
                  {u.is_staff ? "Admin" : "Usuario"}
                </span>

                {/* 2. Botones de Acción: Solo visibles para Administradores */}
                {isAdmin && (
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => handleStartEdit(u)}
                      className="flex-1 bg-cyan-600/20 text-cyan-400 border border-cyan-600/30 py-2 rounded-lg text-sm font-medium hover:bg-cyan-600 hover:text-white transition-all"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="bg-red-500/10 text-red-500 border border-red-500/20 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-500 hover:text-white transition-all"
                    >
                      Eliminar
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Usuarios;