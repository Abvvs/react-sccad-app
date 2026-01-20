export interface Trabajo {
  id: number;
  numero_trabajo: string;
  tipo_trabajo: { id: number; nombre: string };
  descripcion: string;
  direccion_campo?: string;
  monto_total?: number;
  estado: boolean;
  saldo_pendiente?: string; 
  estado_pago?: string;
  estado_actual?: {
    id: number;
    nombre: string;
    color_hex?: string;
  };
  observaciones?: string;
  created_at?: string;
  clientes_relacionados?: TrabajoCliente[];
  cuenta?: {
    id: number;
    monto_total: string;
    saldo_pendiente: string;
    estado_pago: string;
    pagos: Pago[];
  }
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
export interface FormaPago{
  id: number;
  nombre: string;
  es_efectivo: boolean;
}
export interface Pago {
  id: number;
  cuenta_cobrar: number;
  fecha_pago: string;
  forma_pago: string;
  forma_pago_nombre: string;
  monto: string;
  metodo_pago: string;
  referencia?: string;
  observaciones?: string;
}