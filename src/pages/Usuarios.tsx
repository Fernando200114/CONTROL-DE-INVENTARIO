import { useState } from "react";
import UserTable from "../components/UserTable";
// Forma 1
import UserForm from "../components/UserForm";
import type { UserFormData } from "../components/UserForm";



interface User extends UserFormData { id: number }

const Usuarios = () => {
  const [users, setUsers] = useState<User[]>([
    { id:1, nombre:"Fernando", rol:"Admin", email:"fernando@email.com" },
    { id:2, nombre:"Ana", rol:"Usuario", email:"ana@email.com" },
  ]);
  const [editing, setEditing] = useState<User | null>(null);

  const handleSave = (data: UserFormData) => {
    if (editing) {
      setUsers(users.map(u => u.id === editing.id ? { ...u, ...data } : u));
      setEditing(null);
    } else {
      const newUser: User = { id: users.length ? Math.max(...users.map(u=>u.id))+1 : 1, ...data };
      setUsers([...users, newUser]);
    }
  };

  const handleDelete = (id: number) => setUsers(users.filter(u => u.id !== id));
  const handleEdit = (user: User) => setEditing(user);

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"20px" }}>
      <h2>Usuarios</h2>
      <UserForm onSave={handleSave} initialData={editing ?? undefined} onCancel={() => setEditing(null)} />
      <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default Usuarios;
