import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white">
      <Navbar />
      <main className="pt-20 px-6">
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
