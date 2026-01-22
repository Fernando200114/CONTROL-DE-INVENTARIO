import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import AdminLayout from "../layouts/AdminLayout";
import Home from "../pages/public/Home";
import Catalogo from "../pages/public/Catalogo";
import Contacto from "../pages/public/Contacto";
import Login from "../auth/Login";
import Dashboard from "../pages/admin/Dashboard";
import { ProtectedRoute } from "../auth/ProtectedRoute";

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/catalogo", element: <Catalogo /> },
      { path: "/contacto", element: <Contacto /> },
      { path: "/login", element: <Login /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", element: <Dashboard /> },
    ],
  },
]);
