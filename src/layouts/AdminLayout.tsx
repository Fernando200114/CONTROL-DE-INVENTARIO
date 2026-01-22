import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#020617] text-white">
      <Sidebar />
      <main className="flex-1 p-6 animate-fade-in">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
