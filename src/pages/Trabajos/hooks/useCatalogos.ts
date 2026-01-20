import { useState, useCallback } from "react";
import {
  getTiposTrabajo,
  getChoices,
  getClientes,
  getFormaPago,
} from "../services/trabajoService";
import type { TipoTrabajo, EstadoTrabajo, Cliente, Choices, FormaPago } from "../types/trabajos";

export const useCatalogos = () => {
  const [tiposTrabajo, setTiposTrabajo] = useState<TipoTrabajo[]>([]);
  const [estadosTrabajo, setEstadosTrabajo] = useState<EstadoTrabajo[]>([]);
  const [clientesDisponibles, setClientesDisponibles] = useState<Cliente[]>([]);
  const [formaPago, setFormaPago] = useState<FormaPago[]>([]);

  const loadTiposTrabajo = useCallback(() => {
    return getTiposTrabajo().then((res) => {
      setTiposTrabajo(res.data);
      return res;
    });
  }, []);

  const loadChoices = useCallback(() => {
    return getChoices().then((res) => {
      const choices: Choices = res.data;
      const estados = choices.estados_trabajo.map(([value, label]) => ({
        id: Number(value),
        nombre: label,
      }));
      setEstadosTrabajo(estados);
      return res;
    });
  }, []);

  const loadClientes = useCallback(() => {
    return getClientes().then((res) => {
      setClientesDisponibles(res.data);
      return res;
    });
  }, []);
  const loadFormaPago = useCallback(() => {
    return getFormaPago().then((res) => {
      const formas = res.data.forma_pago.map(
        ([value, label]: [string, string]) => ({
          id: Number(value),
          nombre: label,
        })
      );
      setFormaPago(formas);
      return res;
    });
  }, []);

  const loadAllCatalogos = useCallback(() => {
    return Promise.all([loadTiposTrabajo(), loadChoices(), loadClientes(), loadFormaPago()]);
  }, [loadTiposTrabajo, loadChoices, loadClientes, loadFormaPago]);

  return {
    tiposTrabajo,
    estadosTrabajo,
    clientesDisponibles,
    formaPago,
    loadFormaPago,
    loadTiposTrabajo,
    loadChoices,
    loadClientes,
    loadAllCatalogos,
  };
};