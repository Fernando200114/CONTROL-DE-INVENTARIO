import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  // --- LÓGICA DE INCLINACIÓN SUTIL (TILT) ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);

  function handleMouseMove(e: React.MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    x.set(mouseXPos / width - 0.5);
    y.set(mouseYPos / height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="min-h-screen bg-[#020617] flex flex-col items-center justify-center overflow-hidden relative"
    >
      
      {/* 1. Fondo Animado: Círculos de luz y Partículas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[150px]" 
        />

        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            initial={{ 
              opacity: Math.random() * 0.5, 
              x: Math.random() * 100 + "vw", 
              y: Math.random() * 100 + "vh" 
            }}
            animate={{ 
              y: [null, Math.random() * -200 - 100],
              opacity: [0, 0.4, 0] 
            }}
            transition={{ 
              duration: Math.random() * 10 + 10, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
        ))}
      </div>

      {/* 2. Contenido Principal con efecto de inclinación sutil */}
      <motion.div 
        style={{ rotateX, rotateY, perspective: 1000 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 text-center px-4"
      >
        
        {/* Icono con Efecto 3D y Flotación */}
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            rotateY: [0, 360],
          }}
          transition={{ 
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            rotateY: { duration: 12, repeat: Infinity, ease: "linear" }
          }}
          className="mb-10 flex justify-center perspective-1000"
        >
          <div className="p-6 bg-blue-500/10 rounded-3xl border border-blue-500/30 shadow-[0_0_60px_-15px_rgba(59,130,246,0.6)] backdrop-blur-sm">
            <svg className="w-20 h-20 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
        </motion.div>

        {/* Texto */}
        <motion.h1 
          initial={{ letterSpacing: "0.2em", opacity: 0 }}
          animate={{ letterSpacing: "0em", opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter"
        >
          STOCK<span className="text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">MASTER</span>
        </motion.h1>
        
        <p className="text-slate-400 text-lg md:text-2xl max-w-xl mx-auto mb-12 font-light leading-relaxed">
          La nueva era del <span className="text-white font-medium">control de inventarios</span>. 
          Gestión inteligente, resultados impecables.
        </p>

        {/* Botón de Acción */}
        <motion.button
          whileHover={{ 
            scale: 1.05, 
            boxShadow: "0 0 30px rgba(59, 130, 246, 0.6)",
            backgroundColor: "#3b82f6" 
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/login')}
          className="group px-10 py-5 bg-blue-600 text-white font-bold rounded-2xl transition-all duration-300 text-xl flex items-center gap-3 mx-auto border border-blue-400/30"
        >
          Para comenzar
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.span>
        </motion.button>
      </motion.div>

      {/* 3. Footer Decorativo */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 flex items-center gap-4 text-slate-500 text-xs font-bold uppercase tracking-[0.3em]"
      >
        <div className="h-[1px] w-12 bg-slate-800"></div>
        GRUPO 26
        <div className="h-[1px] w-12 bg-slate-800"></div>
      </motion.div>
    </div>
  );
};

export default Welcome;