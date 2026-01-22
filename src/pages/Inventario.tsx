import { useState } from "react";
import InventoryTable from "../components/InventoryTable";
import type { InventoryItem } from "../components/InventoryTable";


const Inventario = () => {
  const [items, setItems] = useState<InventoryItem[]>([
    { id:1, nombre:"Laptop Gamer", categoria:"Electrónica", stock:12, proveedor:"TechStore", fecha:"2026-01-01" },
    { id:2, nombre:"Teclado Mecánico", categoria:"Accesorios", stock:30, proveedor:"AccesoriesCo", fecha:"2026-01-05" },
    { id:3, nombre:"Monitor 24''", categoria:"Electrónica", stock:10, proveedor:"TechStore", fecha:"2026-01-08" },
  ]);

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"20px" }}>
      <h2>Inventario</h2>
      <InventoryTable items={items} />
    </div>
  );
};

export default Inventario;
