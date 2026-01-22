import { Edit, Trash2 } from "lucide-react";
import type { UserFormData } from "./UserForm";

interface User extends UserFormData { id:number }
interface Props { users: User[]; onEdit: (user:User)=>void; onDelete: (id:number)=>void }

const UserTable = ({ users, onEdit, onDelete }: Props) => {
  return (
    <div style={{ overflowX:"auto", border:"1px solid #1e293b", borderRadius:"12px" }}>
      <table style={{ width:"100%", borderCollapse:"collapse" }}>
        <thead style={{ background:"#0f172a", color:"#fff" }}>
          <tr>
            <th style={{ padding:"12px" }}>ID</th><th>Nombre</th><th>Email</th><th>Rol</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody style={{ color:"#fff" }}>
          {users.map(u => (
            <tr key={u.id} style={{ borderBottom:"1px solid #1e293b" }}>
              <td style={{ padding:"10px", textAlign:"center" }}>{u.id}</td>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>{u.rol}</td>
              <td style={{ display:"flex", gap:"10px", justifyContent:"center" }}>
                <Edit size={18} style={{ cursor:"pointer" }} onClick={()=>onEdit(u)} />
                <Trash2 size={18} style={{ cursor:"pointer" }} onClick={()=>onDelete(u.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
