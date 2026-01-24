import { useEffect, useState } from "react";
import type { Producto } from "../types/Producto";
import type { PaginatedResponse } from "../types/Pagination";
import { getProductos } from "../api/productos.api";

const Productos = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const loadProductos = async () => {
    try {
      setLoading(true);
      const response: PaginatedResponse<Producto> = await getProductos();
      setProductos(response?.results ?? []);
    } catch (error) {
      console.error("ERROR AL CARGAR PRODUCTOS:", error);
      setProductos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProductos();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold to-black border-gray-200 pb-2">
        Productos
      </h1>

      <section>
        <h2 className="text-xl font-semibold mb-4 to-black">Lista de Productos</h2>

        {loading ? (
          <p className="text-gray-500">Cargando productos...</p>
        ) : productos.length === 0 ? (
          <p className="text-gray-500">No hay productos disponibles.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productos.map((producto) => (
              <div
                key={producto.id}
                className="bg-slate-900/70  shadow-md p-4 hover:shadow-xl transition"
              >
                {/* Nombre */}
                <h3 className="font-bold text-lg mb-1 bg-slate-900/70 ">{producto.nombre}</h3>

                {/* Categoría */}
                {producto.categoria && (
                  <p className="bg-slate-900/70 ">Categoría: {producto.categoria}</p>
                )}

                {/* Precio */}
                <p className="bg-slate-900/70 ">Precio: ${producto.precio}</p>

                {/* Stock */}
                <p className="bg-slate-900/70 ">Stock: {producto.stock}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Productos;
