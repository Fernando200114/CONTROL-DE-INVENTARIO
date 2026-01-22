import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Productos from "./pages/Productos";
import Usuarios from "./pages/Usuarios";
import Inventario from "./pages/Inventario";
import Configuracion from "./pages/Configuracion";
import Login from "./pages/Login";
import Categorias from "./pages/Categorias";
import Proveedores from "./pages/Proveedores";
import Clientes from "./pages/Clientes"


export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />, // Login fuera del layout
    },
    {
        path: "/",
        element: <MainLayout />, // Todo lo demás dentro del layout
        children: [
            
            { index: true, element: <Dashboard /> },
            { path: "productos", element: <Productos /> },
            { path: "usuarios", element: <Usuarios /> },
            { path: "inventario", element: <Inventario /> },
            { path: "configuracion", element: <Configuracion /> },
            { path: "categorias", element: <Categorias /> },
            { path: "proveedores", element: <Proveedores /> },
            { path: "clientes", element: <Clientes /> },
            // { path: "pedidos", element: <Pedidos /> },
            // { path: "movimientos", element: <MovimientosInventario /> },
            // { path: "producto-proveedores", element: <ProductoProveedores /> },


        ],
    },
]);
