import { motion } from "framer-motion";
import { 
  Settings, 
  User, 
  Moon, 
  Bell, 
  Shield, 
  Database,
  Save,
  LogOut
} from "lucide-react";

const Configuracion = () => {
  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-12">
        <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20">
          <Settings className="text-cyan-400" size={32} />
        </div>
        <div>
          <h1 className="text-4xl font-bold">Configuración</h1>
          <p className="text-slate-400">Gestiona las preferencias de tu panel de control</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUMNA IZQUIERDA: PERFIL */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 space-y-8"
        >
          {/* SECCIÓN PERFIL */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-[2rem] p-8 backdrop-blur-xl">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <User className="text-cyan-400" size={20} /> Información del Administrador
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-slate-500 ml-1">Nombre de Usuario</label>
                <input 
                  type="text" 
                  disabled
                  value="Admin_Core"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-300 outline-none cursor-not-allowed"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-500 ml-1">Correo Electrónico</label>
                <input 
                  type="email" 
                  placeholder="admin@empresa.com"
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500 transition-all"
                />
              </div>
            </div>
            <button className="mt-8 flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 px-6 py-3 rounded-xl font-bold transition-all">
              <Save size={18} /> Actualizar Perfil
            </button>
          </div>

          {/* SECCIÓN PREFERENCIAS */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-[2rem] p-8 backdrop-blur-xl">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Moon className="text-purple-400" size={20} /> Apariencia y Sistema
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-950/50 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-4">
                  <Bell className="text-slate-400" />
                  <div>
                    <p className="font-medium">Notificaciones de Stock</p>
                    <p className="text-xs text-slate-500">Avisar cuando un producto baje de 5 unidades</p>
                  </div>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-cyan-500" />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-950/50 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-4">
                  <Shield className="text-slate-400" />
                  <div>
                    <p className="font-medium">Modo de Seguridad Alta</p>
                    <p className="text-xs text-slate-500">Forzar cierre de sesión cada 24 horas</p>
                  </div>
                </div>
                <input type="checkbox" className="w-5 h-5 accent-cyan-500" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* COLUMNA DERECHA: STATUS */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-[2rem] p-8 text-center">
            <div className="w-20 h-20 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-cyan-500/20">
              <Database className="text-cyan-400" size={32} />
            </div>
            <h3 className="text-lg font-bold">Estado del Servidor</h3>
            <p className="text-emerald-400 text-sm flex items-center justify-center gap-2 mt-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Conectado al Backend (Django)
            </p>
            <div className="mt-6 pt-6 border-t border-slate-800">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-500">Versión del Sistema</span>
                <span className="text-slate-300">v2.4.0-build</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Último respaldo</span>
                <span className="text-slate-300">Hoy, 04:20 AM</span>
              </div>
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-3 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all font-bold">
            <LogOut size={20} /> Cerrar Sesión Segura
          </button>
        </motion.div>

      </div>
    </div>
  );
};

export default Configuracion;