import { useState, useCallback } from "react";
import {
  getHistorial,
  crearHistorial,
} from "../services/trabajoService";
import type { HistorialItem } from "../types/trabajos";

export const useHistorial = () => {
  const [historial, setHistorial] = useState<HistorialItem[]>([]);

  const loadHistorial = useCallback((trabajoId: number) => {
    return getHistorial(trabajoId).then((res) => {
      setHistorial(res.data);
      return res;
    });
  }, []);

  const createHistorialItem = useCallback(
    (trabajoId: number, data: any) => {
      return crearHistorial(trabajoId, data).then(() =>
        loadHistorial(trabajoId)
      );
    },
    [loadHistorial]
  );

  return {
    historial,
    loadHistorial,
    createHistorialItem,
    setHistorial
  };
};