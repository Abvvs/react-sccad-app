import { useCallback } from "react";
import {
  agregarCliente,
  eliminarCliente,
} from "../services/trabajoService";

export const useClientesTrabajo = () => {
  const addCliente = useCallback((trabajoId: number, data: any) => {
    return agregarCliente(trabajoId, data);
  }, []);

  const removeCliente = useCallback(
    (trabajoId: number, relacionId: number) => {
      return eliminarCliente(trabajoId, relacionId);
    },
    []
  );

  return {
    addCliente,
    removeCliente,
  };
};