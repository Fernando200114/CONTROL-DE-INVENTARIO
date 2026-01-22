import { motion } from "framer-motion";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ padding: "30px" }}
    >
      <h1>Dashboard</h1>
      <p>Sistema de control de inventario</p>
    </motion.div>
  );
};

export default Home;
