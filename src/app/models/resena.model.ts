export interface Resena {
  id_resena: number;
  id_cli: number;
  nombre_usuario: string;
  calificacion: number;
  comentario: string;
  fecha: Date;
  estado: string; // 'pendiente', 'aprobada', 'rechazada'
}
