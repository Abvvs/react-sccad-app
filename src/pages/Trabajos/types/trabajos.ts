export interface Trabajo {
  id: number;
  numero_trabajo: string;
  descripcion: string;
  tipo_trabajo: { id: number; nombre: string };
  activo: boolean;
  direccion_campo?: string;
  monto_total?: number;
  saldo_pendiente?: number;
  estado_pago?: string;
  estado_pago_display?: string;
  estado_actual?: {
    id: number;
    nombre: string;
    color_hex?: string;
  };
  observaciones?: string;
  created_at?: string;
  clientes_relacionados?: TrabajoCliente[];
}
export interface TipoTrabajo {
  id: number;
  nombre: string;
}
export interface EstadoTrabajo {
  id: number;
  nombre: string;
}
export interface TrabajoCliente {
  id: number;
  trabajo: number; // ID del trabajo
  cliente: number;
  cliente_nombre: string;
  cliente_telefono: string; // ID del cliente
  tipo_etiqueta: string;
  observaciones?: string | null;
  created_at: string;
}
export interface Cliente {
  id: number;
  nombre: string;
  telefono: string;
}
export interface HistorialItem {
  id: number;
  estado_trabajo_nombre: string;
  fecha_cambio: string;
  observaciones: string;
  departamento_actual?: string;
}
export interface Choices {
  estados_trabajo: Array<[string, string]>;
}