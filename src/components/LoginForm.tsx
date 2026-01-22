import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy login: acepta cualquier usuario/contraseña
    if (!username || !password) return alert("Completa todos los campos");
    navigate("/"); // Redirige al dashboard
  };

  return (
    <form onSubmit={handleSubmit} style={{
      display: "flex", flexDirection: "column", gap: "15px",
      padding: "30px", background: "#0f172a", borderRadius: "12px", border: "1px solid #1e293b"
    }}>
      <h2>Iniciar Sesión</h2>
      <input type="text" placeholder="Usuario" value={username} onChange={e => setUsername(e.target.value)}
        style={{ padding: "10px", borderRadius: "6px", border: "1px solid #1e293b" }} />
      <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)}
        style={{ padding: "10px", borderRadius: "6px", border: "1px solid #1e293b" }} />
      <button type="submit" style={{
        padding: "10px 20px", borderRadius: "8px", background: "#2563eb", color: "#fff", border: "none", cursor: "pointer"
      }}>Ingresar</button>
    </form>
  );
};

export default LoginForm;
