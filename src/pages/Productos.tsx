import { useEffect, useState } from "react";
import ProductForm from "../components/ProductForm";
import type { ProductFormData } from "../components/ProductForm";

import ProductTable from "../components/ProductTable";
import type { Producto } from "../types/Producto";
import {
  getProductos,
  createProducto,
  updateProducto,
  deleteProducto,
} from "../api/productos.api";

const Productos = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [selected, setSelected] = useState<Producto | null>(null);

  const loadProductos = async () => {
    const data = await getProductos();
    setProductos(data);
  };

  useEffect(() => {
    loadProductos();
  }, []);

  const handleSave = async (data: ProductFormData) => {
    if (selected) {
      await updateProducto(selected.id, data);
      setSelected(null);
    } else {
      await createProducto(data);
    }
    loadProductos();
  };

  const handleDelete = async (id: number) => {
    if (confirm("¿Eliminar producto?")) {
      await deleteProducto(id);
      loadProductos();
    }
  };

  return (
    <>
      <h2>Productos</h2>
      <ProductForm onSave={handleSave} selected={selected} />

      <ProductTable
        productos={productos}
        onEdit={setSelected}
        onDelete={handleDelete}
      />
    </>
  );
};

export default Productos;
