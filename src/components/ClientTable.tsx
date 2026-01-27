import type { Cliente } from "../types/Cliente";

interface Props {
    clientes: Cliente[];
    onEdit: (cliente: Cliente) => void;
    onDelete: (id: number) => void;
}

const ClientTable = ({ clientes, onEdit, onDelete }: Props) => {
    return (
        <table width="100%" style={{ borderCollapse: "collapse" }}>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {clientes.map(c => (
                    <tr key={c.id}>
                        <td>{c.nombre}</td>
                        <td>{c.email}</td>
                        <td>{c.telefono}</td>
                        <td>
                            <button type="button" onClick={() => onEdit(c)}>
                                ✏️
                            </button>

                            <button onClick={() => onDelete(c.id)}>🗑️</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ClientTable;
