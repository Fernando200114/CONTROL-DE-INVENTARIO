import type { InventoryItem } from "./InventoryTable";

interface Props {
  items?: InventoryItem[];
}

const InventoryTable = ({ items = [] }: Props) => {
  return (
    <div style={{ overflowX:"auto", border:"1px solid #1e293b", borderRadius:"12px" }}>
      <table style={{ width:"100%", borderCollapse:"collapse" }}>
        <thead style={{ background:"#0f172a", color:"#fff" }}>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Stock</th>
            <th>Proveedor</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody style={{ color:"#fff" }}>
          {items.map(i => (
            <tr key={i.id} style={{ borderBottom:"1px solid #1e293b" }}>
              <td style={{ padding:"10px", textAlign:"center" }}>{i.id}</td>
              <td>{i.nombre}</td>
              <td>{i.categoria}</td>
              <td>{i.stock}</td>
              <td>{i.proveedor}</td>
              <td>{i.fecha}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
