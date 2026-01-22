import type { Producto } from "../types/Producto";

interface Props {
  productos: Producto[];
  onEdit: (producto: Producto) => void;
  onDelete: (id: number) => void;
}

const ProductTable = ({ productos, onEdit, onDelete }: Props) => {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Categoría</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((p) => (
          <tr key={p.id}>
            <td>{p.nombre}</td>
            <td>{p.categoria}</td>
            <td>{p.precio}</td>
            <td>{p.stock}</td>
            <td>
              <button type="button" onClick={() => onEdit(p)}>✏️</button>
              <button type="button" onClick={() => onDelete(p.id)}>🗑️</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
