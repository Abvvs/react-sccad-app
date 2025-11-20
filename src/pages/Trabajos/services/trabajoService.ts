import api from "../../../api";

export const getTrabajos = () => api.get("/trabajos/");
export const getTiposTrabajo = () => api.get("/trabajos/catalogos/tipo-trabajo/");
export const getChoices = () => api.get("/trabajos/choices/");
export const getClientes = () => api.get("/clientes/");

// CRUD Trabajo
export const crearTrabajo = (data: any) => api.post("/trabajos/", data);
export const actualizarTrabajo = (id: number, data: any) =>
  api.patch(`/trabajos/${id}/`, data);
export const eliminarTrabajo = (id: number, activo: boolean) =>
  api.patch(`/trabajos/${id}/inactivar/`, { activo });

// Historial
export const getHistorial = (id: number) =>
  api.get(`/trabajos/${id}/historial/`);
export const crearHistorial = (id: number, data: any) =>
  api.post(`/trabajos/${id}/historial/create/`, data);

// ClientesTrabajo
export const agregarCliente = (id: number, data: any) =>
  api.post(`/trabajos/${id}/clientes/agregar/`, data);
export const eliminarCliente = (id: number, clienteId: number) =>
  api.delete(`/trabajos/${id}/clientes/${clienteId}/eliminar/`);