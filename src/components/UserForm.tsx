import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

export interface UserFormData {
  nombre: string;
  email: string;
  rol: string;
  password?: string;
  confirmPassword?: string;
}

interface Props {
  onSave: (user: UserFormData) => void;
  initialData?: UserFormData;
  onCancel?: () => void;
}

const UserForm = ({ onSave, initialData, onCancel }: Props) => {
  const [form, setForm] = useState<UserFormData>({
    nombre: "", email: "", rol: "Usuario", password: "", confirmPassword: ""
  });

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({ ...initialData, password: "", confirmPassword: "" });
    } else {
      setForm({ nombre: "", email: "", rol: "Usuario", password: "", confirmPassword: "" });
    }
  }, [initialData]);

  // 1. AGREGAMOS LA FUNCIÓN QUE FALTABA
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Nombre y Email SIEMPRE obligatorios
    if (!form.nombre || !form.email) return alert("Nombre y Email son obligatorios");

    // 2. Password OBLIGATORIO solo si es NUEVO (no hay initialData)
    if (!initialData && (!form.password || !form.confirmPassword)) {
      return alert("La contraseña es obligatoria para usuarios nuevos");
    }

    // 3. Si escribió algo en password, validar que coincida
    if (form.password && form.password !== form.confirmPassword) {
      return alert("Las contraseñas no coinciden");
    }

    onSave(form);
    setForm(prev => ({ ...prev, password: "", confirmPassword: "" }));
  };

  // ESTILOS
  const inputContainerStyle: React.CSSProperties = { position: "relative", display: "flex", flexDirection: "column" };
  const inputStyle: React.CSSProperties = {
    padding: "12px", paddingRight: "40px", borderRadius: "8px", border: "1px solid #334155",
    background: "#1e293b", color: "#f8fafc", outline: "none", fontSize: "14px"
  };
  const eyeIconStyle: React.CSSProperties = {
    position: "absolute", right: "12px", top: "35px", cursor: "pointer", color: "#94a3b8"
  };
  const labelStyle: React.CSSProperties = { fontSize: "13px", color: "#94a3b8", marginBottom: "5px" };

  return (
    <form onSubmit={handleSubmit} style={{
      display: "flex", flexDirection: "column", gap: "15px", padding: "25px",
      background: "#0f172a", borderRadius: "12px", border: "1px solid #1e293b"
    }}>
      <h3 style={{ margin: "0 0 10px 0", color: "#38bdf8" }}>
        {initialData ? `Editando a -> ${initialData.nombre}` : "👤 Registro de Nuevo Usuario"}
      </h3>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
        <div style={inputContainerStyle}>
          <label style={labelStyle}>Nombre</label>
          <input name="nombre" value={form.nombre} onChange={handleChange} style={inputStyle} />
        </div>
        <div style={inputContainerStyle}>
          <label style={labelStyle}>Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} style={inputStyle} />
        </div>
      </div>

      <div style={inputContainerStyle}>
        <label style={labelStyle}>Rol</label>
        <select name="rol" value={form.rol} onChange={handleChange} style={inputStyle}>
          <option value="Usuario">Usuario</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
        <div style={inputContainerStyle}>
          <label style={labelStyle}>Contraseña {initialData && "(Opcional)"}</label>
          <input
            name="password"
            type={showPass ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            style={inputStyle}
            placeholder={initialData ? "Dejar en blanco para no cambiar" : "Mínimo 8 caracteres"}
          />
          <div style={eyeIconStyle} onClick={() => setShowPass(!showPass)}>
            {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
          </div>
        </div>

        <div style={inputContainerStyle}>
          <label style={labelStyle}>Confirmar Contraseña</label>
          <input
            name="confirmPassword"
            type={showConfirmPass ? "text" : "password"}
            value={form.confirmPassword}
            onChange={handleChange}
            style={inputStyle}
          />
          <div style={eyeIconStyle} onClick={() => setShowConfirmPass(!showConfirmPass)}>
            {showConfirmPass ? <EyeOff size={18} /> : <Eye size={18} />}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <button type="submit" style={{ flex: 2, padding: "12px", borderRadius: "8px", background: "#2563eb", color: "#fff", border: "none", cursor: "pointer", fontWeight: "bold" }}>
          {initialData ? "Actualizar Datos" : "Registrar Usuario"}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} style={{ flex: 1, padding: "12px", borderRadius: "8px", background: "#334155", color: "#cbd5e1", border: "none", cursor: "pointer" }}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default UserForm;