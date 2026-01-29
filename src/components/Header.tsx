import { LogOut, User } from "lucide-react"; // Importamos los iconos
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "Usuario";

  const handleLogout = () => {
    // 1. Limpiamos el almacenamiento
    localStorage.removeItem("token");
    localStorage.removeItem("is_staff");
    localStorage.removeItem("username");
    
    // 2. Redirigimos al login
    navigate("/");
  };

  return (
    <header style={{
      height: "70px",
      background: "#020617",
      borderBottom: "1px solid #1e293b",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between", // Separa el título del botón
      padding: "0 30px",
      color: "white"
    }}>
      {/* Lado Izquierdo: Título y Usuario */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: "600", color: "#38bdf8" }}>
          Dashboard
        </h3>
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "8px", 
          background: "#0f172a", 
          padding: "5px 12px", 
          borderRadius: "20px",
          border: "1px solid #334155",
          fontSize: "0.9rem"
        }}>
          <User size={16} className="text-slate-400" />
          <span>{username}</span>
        </div>
      </div>

      {/* Lado Derecho: Botón de Salida */}
      <button 
        onClick={handleLogout}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          background: "transparent",
          color: "#f87171", // Un tono rojo suave
          border: "1px solid #f87171",
          padding: "8px 16px",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "500",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#f87171";
          e.currentTarget.style.color = "white";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "#f87171";
        }}
      >
        <span>Cerrar Sesión</span>
        <LogOut size={18} />
      </button>
    </header>
  );
};

export default Header;