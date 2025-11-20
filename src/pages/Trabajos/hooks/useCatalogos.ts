import { useState, useCallback } from "react";
import {
  getTiposTrabajo,
  getChoices,
  getClientes,
} from "../services/trabajoService";
import type { TipoTrabajo, EstadoTrabajo, Cliente, Choices } from "../types/trabajos";

export const useCatalogos = () => {
  const [tiposTrabajo, setTiposTrabajo] = useState<TipoTrabajo[]>([]);
  const [estadosTrabajo, setEstadosTrabajo] = useState<EstadoTrabajo[]>([]);
  const [clientesDisponibles, setClientesDisponibles] = useState<Cliente[]>([]);

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

  const loadAllCatalogos = useCallback(() => {
    return Promise.all([loadTiposTrabajo(), loadChoices(), loadClientes()]);
  }, [loadTiposTrabajo, loadChoices, loadClientes]);

  return {
    tiposTrabajo,
    estadosTrabajo,
    clientesDisponibles,
    loadTiposTrabajo,
    loadChoices,
    loadClientes,
    loadAllCatalogos,
  };
};