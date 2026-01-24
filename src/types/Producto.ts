export interface Producto {
  id?: number;
  nombre: string;
  precio: number;
  stock: number;
  cantidad_minima: number;
  unidad: string;
  categoria: number; // ID de la categoría
  imagen?: string;
}
