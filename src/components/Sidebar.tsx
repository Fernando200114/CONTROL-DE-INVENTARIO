import { Home, Package, Users, Settings, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <aside style={{ width: "240px", background: "#020617", color: "#fff", padding: "20px" }}>
            <h2 style={{ marginBottom: "30px" }}>📦 Inventario</h2>
            <nav style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <NavLink to="/" style={({ isActive }) => ({ color: isActive ? "#2563eb" : "#fff" })}><Home size={18} /> Dashboard</NavLink>
                <NavLink to="/productos" style={({ isActive }) => ({ color: isActive ? "#2563eb" : "#fff" })}><Package size={18} /> Productos</NavLink>
                <NavLink to="/usuarios" style={({ isActive }) => ({ color: isActive ? "#2563eb" : "#fff" })}><Users size={18} /> Usuarios</NavLink>
                <NavLink to="/inventario" style={({ isActive }) => ({ color: isActive ? "#2563eb" : "#fff" })}><Package size={18} /> Inventario</NavLink>
                <NavLink to="/configuracion" style={({ isActive }) => ({ color: isActive ? "#2563eb" : "#fff" })}><Settings size={18} /> Configuración</NavLink>
                <NavLink to="/categorias">📂 Categorías</NavLink>
                <NavLink to="/proveedores">🚚 Proveedores</NavLink>
                <NavLink to="/clientes">👤 Clientes</NavLink>


            </nav>
        </aside>
    );
};

export default Sidebar;
