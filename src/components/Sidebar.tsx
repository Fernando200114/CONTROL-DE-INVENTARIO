import { motion } from "framer-motion";
import { Home, Package, Users, Settings, Layers, Truck, UserCircle } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    // Clase para los enlaces (reutilización para no repetir código)
    const linkClasses = ({ isActive }: { isActive: boolean }) => 
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
            isActive 
            ? "bg-cyan-500/10 text-cyan-400 border-r-2 border-cyan-500 shadow-[inset_0_0_10px_rgba(6,182,212,0.1)]" 
            : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
        }`;

    return (
        <aside className="w-64 min-h-screen bg-slate-950 border-r border-slate-800 p-6 flex flex-col">
            
            {/* LOGO SECCIÓN */}
            <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 mb-10 pl-2"
            >
                <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                    <Package className="text-cyan-400" size={24} />
                </div>
                <h2 className="text-xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500 uppercase">
                    STOCKMASTER
                </h2>
            </motion.div>

            {/* NAVEGACIÓN */}
            <nav className="flex flex-col gap-2">
                <NavLink to="/admin" className={linkClasses} end>
                    <Home size={20} /> <span className="font-medium">Dashboard</span>
                </NavLink>

                <div className="my-4 border-t border-slate-800/50 mx-2" /> {/* Separador */}

                <NavLink to="/admin/productos" className={linkClasses}>
                    <Package size={20} /> <span className="font-medium">Productos</span>
                </NavLink>

                <NavLink to="/admin/categorias" className={linkClasses}>
                    <Layers size={20} /> <span className="font-medium">Categorías</span>
                </NavLink>

                <NavLink to="/admin/proveedores" className={linkClasses}>
                    <Truck size={20} /> <span className="font-medium">Proveedores</span>
                </NavLink>

                <NavLink to="/admin/clientes" className={linkClasses}>
                    <UserCircle size={20} /> <span className="font-medium">Clientes</span>
                </NavLink>

                <NavLink to="/admin/usuarios" className={linkClasses}>
                    <Users size={20} /> <span className="font-medium">Usuarios</span>
                </NavLink>

                <div className="mt-auto pt-10"> {/* Empuja la configuración al fondo */}
                    <NavLink to="/admin/configuracion" className={linkClasses}>
                        <Settings size={20} className="group-hover:rotate-90 transition-transform duration-500" /> 
                        <span className="font-medium">Configuración</span>
                    </NavLink>
                </div>
            </nav>
        </aside>
    );
};

export default Sidebar;