import { useState, useCallback } from "react";
import {
  getTrabajos,
  crearTrabajo,
  actualizarTrabajo,
  eliminarTrabajo,
  getHistorial,
} from "../services/trabajoService";
import type { Trabajo } from "../types/trabajos";

export const useTrabajos = () => {
  const [trabajos, setTrabajos] = useState<Trabajo[]>([]);
  const [loading, setLoading] = useState(false);

  const loadTrabajos = useCallback(() => {
    setLoading(true);
    return getTrabajos()
      .then((res) => {
        setTrabajos(res.data);
        return res;
      })
      .finally(() => setLoading(false));
  }, []);

  const createTrabajo = useCallback(
    (data: any) =>
      crearTrabajo(data).then((res) => {
        loadTrabajos();
        return res;
      }),
    [loadTrabajos]
  );

  const updateTrabajo = useCallback(
    (id: number, data: any) =>
      actualizarTrabajo(id, data).then((res) => {
        loadTrabajos();
        return res;
      }),
    [loadTrabajos]
  );

  const toggleTrabajoActivo = useCallback(
    (id: number, activo: boolean) =>
      eliminarTrabajo(id, activo).then((res) => {
        loadTrabajos();
        return res;
      }),
    [loadTrabajos]
  );

  const loadHistorialTrabajo = useCallback((id: number) => {
    return getHistorial(id);
  }, []);

  return {
    trabajos,
    loading,
    loadTrabajos,
    createTrabajo,
    updateTrabajo,
    toggleTrabajoActivo,
    loadHistorialTrabajo,
  };
};