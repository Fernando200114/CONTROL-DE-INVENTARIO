import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Package,
  Users,
  Truck, // Cambiamos TrendingUp por Truck
  Star,
  Instagram,
  Facebook,
  Linkedin,
  Activity,
  UserCircle,
} from "lucide-react";

// Importa tus APIs
import { getProductos } from "../api/productos.api";
import { getClientes } from "../api/clientes.api";
import { getProveedores } from "../api/proveedores.api";

const team = [
  {
    name: "Fernando Llulluna",
    role: "EMPLEADO SIN SALARIO",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fernando",
    instagram: "#",
    facebook: "#",
    linkedin: "#",
  },
  {
    name: "Paredes Erick",
    role: "Empleado",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Erick",
    instagram: "#",
    facebook: "#",
    linkedin: "#",
  },
];

export default function Dashboard() {
  const [stats, setStats] = useState({
    productos: 0,
    clientes: 0,
    proveedores: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [prodRes, cliRes, provRes]: any[] = await Promise.all([
          getProductos(),
          getClientes(),
          getProveedores(),
        ]);

        // REVISIÓN EN CONSOLA: Mira qué estructura tiene 'cliRes'
        console.log("CLIENTES DATA:", cliRes);

        const getCount = (res: any) => {
          if (!res) return 0;
          // 1. Si viene en .count (Paginación DRF)
          if (res.count !== undefined) return res.count;
          // 2. Si viene en .results (Array dentro de objeto)
          if (res.results && Array.isArray(res.results)) return res.results.length;
          // 3. Si es un array directo
          if (Array.isArray(res)) return res.length;
          return 0;
        };

        setStats({
          productos: getCount(prodRes),
          clientes: getCount(cliRes),
          proveedores: getCount(provRes),
        });
      } catch (error) {
        console.error("Error cargando estadísticas:", error);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    { title: "Productos", value: stats.productos, icon: Package, color: "text-cyan-400" },
    { title: "Clientes", value: stats.clientes, icon: Users, color: "text-emerald-400" },
    { title: "Proveedores", value: stats.proveedores, icon: Truck, color: "text-orange-400" },
  ];

  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      {/* HERO */}
      <motion.section
        className="relative overflow-hidden rounded-[2.5rem] mb-24 border border-white/5"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          alt="Hero background"
        />
        <div className="relative z-10 p-20">
          <motion.h1
            className="text-6xl font-extrabold mb-6"
            initial={{ letterSpacing: "0.1em" }}
            animate={{ letterSpacing: "0.02em" }}
          >
            Inventario Inteligente
          </motion.h1>
          <p className="text-xl text-slate-300 max-w-3xl mb-10">
            Un sistema moderno para gestionar productos, clientes y operaciones
            con eficiencia, control y diseño profesional.
          </p>
          <div className="flex items-center gap-3 text-cyan-400 font-mono">
            <Activity className="animate-pulse" /> SISTEMA OPERATIVO Y SINCRONIZADO
          </div>
        </div>
      </motion.section>

      {/* STATS REALES */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-24">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            className="relative bg-slate-900/80 border border-slate-800 rounded-3xl p-10 shadow-2xl backdrop-blur-xl group"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5, borderColor: "rgba(6, 182, 212, 0.5)" }}
          >
            <card.icon size={46} className={`mb-6 ${card.color} group-hover:scale-110 transition-transform`} />
            <h3 className="text-lg text-slate-500 font-medium uppercase tracking-widest">{card.title}</h3>
            <p className="text-6xl font-black mt-2 tracking-tighter">
              {card.value < 10 ? `0${card.value}` : card.value}
            </p>
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-transparent to-cyan-500 transition-all duration-500 group-hover:w-full" />
          </motion.div>
        ))}
      </section>

      {/* TEAM */}
      <motion.section
        className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-16 shadow-2xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold mb-14 flex items-center gap-4">
          <Star className="text-yellow-400 fill-yellow-400" size={34} /> Equipo del Proyecto
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {team.map((member) => (
            <motion.div
              key={member.name}
              className="flex gap-8 items-center bg-slate-800/30 p-8 rounded-3xl border border-white/5"
              whileHover={{ x: 10 }}
            >
              <div className="w-24 h-24 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                <UserCircle size={48} className="text-cyan-400" />
              </div>
              <div className="flex-1">
                <p className="text-2xl font-semibold">{member.name}</p>
                <p className="text-cyan-500 font-mono text-xs uppercase mb-4">{member.role}</p>
                <div className="flex gap-5 text-slate-500">
                  <a href={member.instagram} className="hover:text-pink-400"><Instagram size={20} /></a>
                  <a href={member.facebook} className="hover:text-blue-400"><Facebook size={20} /></a>
                  <a href={member.linkedin} className="hover:text-cyan-400"><Linkedin size={20} /></a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}