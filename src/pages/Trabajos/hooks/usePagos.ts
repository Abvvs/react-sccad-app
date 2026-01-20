import { useState, useCallback } from "react";
import { crearPago, eliminarPago } from "../services/trabajoService";


interface CrearPagoPayload {
  cuenta_cobrar: number;
  forma_pago: number;
  fecha_pago: string;
  monto: string | number;
  observaciones?: string;
}

export const usePagos = () => {
  const [loading, setLoading] = useState(false);

  const addPago = useCallback(
    async (data: CrearPagoPayload) => {
      setLoading(true);
      try {
        await crearPago(data);
      } finally {
        setLoading(false);
      }
    },[]);

  const removePago = useCallback(
    async (pagoId: number) => {
      setLoading(true);
      try {
        await eliminarPago(pagoId);
      } finally {
        setLoading(false);
      }
    },[]);

  return {
    addPago,
    removePago,
    loading,
  };
};