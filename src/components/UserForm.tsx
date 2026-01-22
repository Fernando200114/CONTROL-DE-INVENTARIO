import { useState, useEffect } from "react";

export interface UserFormData {
  nombre: string;
  email: string;
  rol: string;
}

interface Props {
  onSave: (user: UserFormData) => void;
  initialData?: UserFormData;
  onCancel?: () => void;
}

const UserForm = ({ onSave, initialData, onCancel }: Props) => {
  const [form, setForm] = useState<UserFormData>({ nombre:"", email:"", rol:"Usuario" });

  useEffect(() => { if(initialData) setForm(initialData); }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!form.nombre || !form.email || !form.rol) return alert("Completa todos los campos");
    onSave(form);
    setForm({ nombre:"", email:"", rol:"Usuario" });
  };

  return (
    <form onSubmit={handleSubmit} style={{
      display:"flex", flexDirection:"column", gap:"15px",
      padding:"20px", background:"#0f172a", borderRadius:"12px", border:"1px solid #1e293b"
    }}>
      <h3>{initialData ? "Editar Usuario" : "Nuevo Usuario"}</h3>
      <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange}
        style={{ padding:"10px", borderRadius:"6px", border:"1px solid #1e293b" }} />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange}
        style={{ padding:"10px", borderRadius:"6px", border:"1px solid #1e293b" }} />
      <select name="rol" value={form.rol} onChange={handleChange} style={{ padding:"10px", borderRadius:"6px", border:"1px solid #1e293b" }}>
        <option value="Usuario">Usuario</option>
        <option value="Admin">Admin</option>
      </select>
      <div style={{ display:"flex", gap:"10px" }}>
        <button type="submit" style={{ padding:"10px 20px", borderRadius:"8px", background:"#2563eb", color:"#fff", border:"none", cursor:"pointer" }}>Guardar</button>
        {onCancel && <button type="button" onClick={onCancel} style={{ padding:"10px 20px", borderRadius:"8px", background:"#64748b", color:"#fff", border:"none", cursor:"pointer" }}>Cancelar</button>}
      </div>
    </form>
  );
};

export default UserForm;
