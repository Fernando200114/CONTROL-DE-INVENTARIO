import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Productos from "./pages/Productos";
import Usuarios from "./pages/Usuarios";
import Inventario from "./pages/Inventario";
import Configuracion from "./pages/Configuracion";
import Login from "./pages/Login";
import Categorias from "./pages/Categorias";
import Proveedores from "./pages/Proveedores";
import Clientes from "./pages/Clientes";
import Welcome from "./pages/public/Welcome"; // 👈 Importa tu nueva página

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export const router = createBrowserRouter([
  {
    path: "/", // 👈 Ahora la raíz es la Bienvenida
    element: <Welcome />,
  },
  {
    path: "/login",
    element: <Login />, 
  },
  {
    path: "/admin", // 👈 Movemos el dashboard a /admin o mantenemos la estructura agrupada
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "productos", element: <Productos /> },
      { path: "usuarios", element: <Usuarios /> },
      { path: "inventario", element: <Inventario /> },
      { path: "configuracion", element: <Configuracion /> },
      { path: "categorias", element: <Categorias /> },
      { path: "proveedores", element: <Proveedores /> },
      { path: "clientes", element: <Clientes /> },
    ],
  },
]);