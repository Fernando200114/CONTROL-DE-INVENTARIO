import { motion } from "framer-motion";
import {
  Package,
  Users,
  TrendingUp,
  Star,
  Instagram,
  Facebook,
  Linkedin,
  Activity,
} from "lucide-react";

const team = [
  {
    name: "Fernando Llulluna",
    role: "EMPLEADO SIN SALARIO",
    image: "",
    instagram: "#",
    facebook: "#",
    linkedin: "#",
  },
  {
    name: "Paredes Erick",
    role: "DESEMPLEADO",
    image: "",
    instagram: "#",
    facebook: "#",
    linkedin: "#",
  },
];

const cards = [
  { title: "Productos", value: "128", icon: Package, color: "text-cyan-400" },
  { title: "Clientes", value: "42", icon: Users, color: "text-emerald-400" },
  { title: "Ventas", value: "$12,340", icon: TrendingUp, color: "text-purple-400" },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">

      {/* HERO */}
      <motion.section
        className="relative overflow-hidden rounded-[2.5rem] mb-24"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src="https://images.unsplash.com/photo-1556155092-8707de31f9c4"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
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
          <div className="flex items-center gap-3 text-cyan-400">
            <Activity /> Plataforma activa y en tiempo real
          </div>
        </div>
      </motion.section>

      {/* STATS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-24">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            className="relative bg-slate-800/60 rounded-3xl p-10 shadow-2xl backdrop-blur-xl"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            whileHover={{ scale: 1.12, rotateX: 12, rotateY: -12 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <card.icon size={46} className={`mb-6 ${card.color}`} />
            <h3 className="text-lg text-slate-400">{card.title}</h3>
            <p className="text-5xl font-bold mt-2">{card.value}</p>
          </motion.div>
        ))}
      </section>

      {/* TEAM */}
      <motion.section
        className="bg-slate-800/50 rounded-[2.5rem] p-16 shadow-2xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold mb-14 flex items-center gap-4">
          <Star className="text-yellow-400" size={34} /> Equipo del Proyecto
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {team.map((member) => (
            <motion.div
              key={member.name}
              className="flex gap-8 items-center bg-slate-900/70 p-8 rounded-3xl"
              whileHover={{ scale: 1.08 }}
            >
              <img
                src={member.image}
                className="w-28 h-28 rounded-full object-cover border-2 border-cyan-400"
              />
              <div className="flex-1">
                <p className="text-2xl font-semibold">{member.name}</p>
                <p className="text-slate-400 mb-4">{member.role}</p>
                <div className="flex gap-5">
                  <a href={member.instagram}><Instagram size={22} className="hover:text-pink-400" /></a>
                  <a href={member.facebook}><Facebook size={22} className="hover:text-blue-400" /></a>
                  <a href={member.linkedin}><Linkedin size={22} className="hover:text-cyan-400" /></a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
