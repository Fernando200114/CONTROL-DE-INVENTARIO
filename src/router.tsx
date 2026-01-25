import { createBrowserRouter, Navigate } from "react-router-dom"; // 👈 Importamos Navigate
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

// 1. Componente Guardián (ProtectedRoute)
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Si no hay token en el localStorage, rebota al login
    return <Navigate to="/login" replace />;
  }

  // Si hay token, permite ver el Layout y sus páginas hijas
  return children;
};

// 2. Configuración del Router
export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />, // El login siempre es accesible si no hay sesión
  },
  {
    path: "/",
    // Envolvemos el MainLayout para proteger TODO lo que está adentro
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