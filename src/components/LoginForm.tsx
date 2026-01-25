import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Para mostrar que está cargando
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return alert("Completa todos los campos");

    setLoading(true);
    try {
      const response = await fetch("https://paredes-inventario-api.desarrollo-software.xyz/api/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // --- GUARDADO DE DATOS REALES ---
        localStorage.setItem("token", data.token);
        localStorage.setItem("is_staff", String(data.is_staff)); // Guardamos si es admin
        localStorage.setItem("username", username);

        alert("¡Bienvenido al sistema!");
        navigate("/"); // Redirige al dashboard o inicio
      } else {
        alert(data.error || "Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error en login:", error);
      alert("No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      display: "flex", flexDirection: "column", gap: "15px",
      padding: "30px", background: "#0f172a", borderRadius: "12px", border: "1px solid #1e293b",
      color: "white"
    }}>
      <h2 style={{ textAlign: "center" }}>Iniciar Sesión</h2>
      
      <input 
        type="text" 
        placeholder="Usuario" 
        value={username} 
        onChange={e => setUsername(e.target.value)}
        disabled={loading}
        style={{ padding: "10px", borderRadius: "6px", border: "1px solid #1e293b", background: "#1e293b", color: "white" }} 
      />
      
      <input 
        type="password" 
        placeholder="Contraseña" 
        value={password} 
        onChange={e => setPassword(e.target.value)}
        disabled={loading}
        style={{ padding: "10px", borderRadius: "6px", border: "1px solid #1e293b", background: "#1e293b", color: "white" }} 
      />
      
      <button 
        type="submit" 
        disabled={loading}
        style={{
          padding: "10px 20px", 
          borderRadius: "8px", 
          background: loading ? "#64748b" : "#2563eb", 
          color: "#fff", 
          border: "none", 
          cursor: loading ? "not-allowed" : "pointer",
          fontWeight: "bold"
        }}
      >
        {loading ? "Verificando..." : "Ingresar"}
      </button>
    </form>
  );
};

export default LoginForm;