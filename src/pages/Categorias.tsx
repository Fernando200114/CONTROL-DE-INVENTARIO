import { useState } from "react";
import Button from "../components/Button";

const Categorias = () => {
  const [categorias, setCategorias] = useState<string[]>([
    "Electrónica",
    "Accesorios",
    "Oficina"
  ]);

  const addCategoria = () => {
    setCategorias([...categorias, `Nueva categoría ${categorias.length + 1}`]);
  };

  return (
    <div>
      <h2>Categorías</h2>

      <Button label="Agregar categoría" onClick={addCategoria} />

      <ul style={{ marginTop: "20px" }}>
        {categorias.map((cat, i) => (
          <li key={i}>{cat}</li>
        ))}
      </ul>
    </div>
  );
};

export default Categorias;
