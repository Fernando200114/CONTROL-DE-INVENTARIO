export interface Producto {
  id?: number;
  nombre: string;
  precio: number;
  stock: number;
  cantidad_minima: number;
  unidad: string;
  categoria: number;
  categoria_nombre?: string; 
  imagen?: string; 
}