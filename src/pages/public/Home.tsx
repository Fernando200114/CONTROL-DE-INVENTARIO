const Home = () => {
  return (
    <section className="flex flex-col items-center justify-center text-center min-h-[80vh]">
      
      <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent animate-pulse">
        Sistema de Control de Inventario
      </h1>

      <p className="max-w-2xl text-gray-300 mb-10">
        Plataforma moderna, segura y escalable para la gestión de productos,
        pedidos y movimientos de inventario.
      </p>

      <div className="flex gap-6">
        <a
          href="/catalogo"
          className="px-6 py-3 rounded-xl bg-cyan-500 text-black font-semibold hover:scale-105 transition"
        >
          Ver Catálogo
        </a>

        <a
          href="/login"
          className="px-6 py-3 rounded-xl border border-cyan-400 hover:bg-cyan-400 hover:text-black transition"
        >
          Acceso Admin
        </a>
      </div>

    </section>
  );
};

export default Home;
