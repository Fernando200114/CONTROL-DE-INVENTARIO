import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Settings, 
  User, 
  Moon, 
  Bell, 
  Shield, 
  Database,
  Save,
  LogOut,
  ChevronRight
} from "lucide-react";

const Configuracion = () => {
  const navigate = useNavigate();
  
  // Obtenemos los datos reales del usuario
  const username = localStorage.getItem("username") || "Usuario";
  const isStaff = localStorage.getItem("is_staff") === "true";

  const handleLogout = () => {
    localStorage.clear(); // Limpia token, username y is_staff
    navigate("/"); // Redirige a la pantalla de bienvenida
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen p-6 md:p-10 bg-[#020617] text-white"
    >
      
      {/* HEADER CON GLOW */}
      <header className="flex items-center gap-6 mb-12 relative">
        <div className="absolute -left-10 top-0 w-24 h-24 bg-cyan-500/20 blur-[50px] rounded-full"></div>
        <div className="p-4 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 shadow-lg shadow-cyan-500/5">
          <Settings className="text-cyan-400" size={32} />
        </div>
        <div>
          <h1 className="text-4xl font-black tracking-tight">Configuración</h1>
          <p className="text-slate-400 flex items-center gap-2">
            Panel de control <ChevronRight size={14} /> {username}
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUMNA IZQUIERDA: PERFIL */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* SECCIÓN PERFIL */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8 backdrop-blur-md hover:border-slate-700 transition-colors"
          >
            <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <User className="text-blue-400" size={20} />
              </div>
              Información de la Cuenta
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">ID Administrador</label>
                <input 
                  type="text" 
                  disabled
                  value={username}
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-5 py-4 text-slate-300 outline-none ring-1 ring-transparent group-hover:ring-blue-500/20 transition-all cursor-not-allowed"
                />
              </div>
              <div className="group space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Rango de Acceso</label>
                <div className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-5 py-4 text-cyan-400 font-mono">
                  {isStaff ? "⚡ SYSTEM_ADMIN" : "USER_OPERATOR"}
                </div>
              </div>
            </div>

            <button className="mt-10 group flex items-center gap-3 bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-95">
              <Save size={18} className="group-hover:rotate-12 transition-transform" /> 
              Guardar Cambios
            </button>
          </motion.div>

          {/* SECCIÓN PREFERENCIAS */}
          <motion.div variants={itemVariants} className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8 backdrop-blur-md">
            <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Moon className="text-purple-400" size={20} />
              </div>
              Sistema y Seguridad
            </h2>
            
            <div className="space-y-4">
              {[
                { icon: <Bell size={20} />, title: "Alertas de Stock Crítico", desc: "Notificar si el inventario es menor a 10 unidades", color: "text-amber-400" },
                { icon: <Shield size={20} />, title: "Autenticación Reforzada", desc: "Solicitar credenciales para cambios sensibles", color: "text-emerald-400" }
              ].map((pref, idx) => (
                <div key={idx} className="flex items-center justify-between p-5 bg-slate-950/40 rounded-3xl border border-slate-800/50 hover:bg-slate-900/60 transition-all">
                  <div className="flex items-center gap-5">
                    <div className={`${pref.color} p-3 bg-slate-900 rounded-2xl`}>{pref.icon}</div>
                    <div>
                      <p className="font-bold text-slate-200">{pref.title}</p>
                      <p className="text-sm text-slate-500">{pref.desc}</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked={idx === 0} />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* COLUMNA DERECHA: STATUS */}
        <div className="space-y-8">
          <motion.div 
            variants={itemVariants}
            className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-[2.5rem] p-8 relative overflow-hidden group"
          >
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/5 blur-3xl group-hover:bg-cyan-500/10 transition-all"></div>
            
            <div className="w-20 h-20 bg-cyan-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-cyan-500/20 shadow-inner">
              <Database className="text-cyan-400" size={32} />
            </div>
            
            <h3 className="text-center text-lg font-black uppercase tracking-widest text-slate-300">Infraestructura</h3>
            
            <div className="mt-8 space-y-4">
              <div className="flex flex-col gap-2 p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Estado</span>
                <p className="text-emerald-400 font-bold flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                  OPERACIONAL
                </p>
              </div>

              <div className="p-4 bg-slate-950/50 rounded-2xl border border-slate-800 text-sm space-y-3">
                <div className="flex justify-between uppercase font-bold text-[10px] tracking-tighter">
                  <span className="text-slate-500">Core Engine</span>
                  <span className="text-slate-300">Django 4.2</span>
                </div>
                <div className="flex justify-between uppercase font-bold text-[10px] tracking-tighter">
                  <span className="text-slate-500">Frontend React</span>
                  <span className="text-slate-300">v18.2.0</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.button 
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="w-full group flex items-center justify-center gap-3 p-5 bg-red-500/10 border border-red-500/20 text-red-500 rounded-[2rem] hover:bg-red-500 hover:text-white transition-all font-black uppercase tracking-widest shadow-xl shadow-red-500/5"
          >
            <LogOut size={22} className="group-hover:-translate-x-1 transition-transform" /> 
            Finalizar Sesión
          </motion.button>
        </div>

      </div>
    </motion.div>
  );
};

export default Configuracion;