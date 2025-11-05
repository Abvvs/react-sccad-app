import React, { useState } from "react";
import axios from "axios";

interface Trabajo {
  id: number;
  numero_trabajo: string;
  descripcion: string;
  direccion_campo: string;
  monto_total: string;
  estado_pago: string;
  prioridad: string;
  tipo_trabajo?: {
    nombre: string;
  };
  estado_actual?: {
    nombre: string;
    color_hex: string;
  };
}

const SearchForm = () => {
  const [query, setQuery] = useState("");
  const [trabajos, setTrabajos] = useState<Trabajo[]>([]);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Consultando trabajo:", query);
    setError("");
    setTrabajos([]);
    try {
      const res = await axios.get(
        `http://localhost:8000/trabajos/buscar/?q=${encodeURIComponent(query)}`
      );
      console.log("Respuesta:", res.data);
      setTrabajos(res.data);
    } catch (err: any) {
      if (err.response?.status === 404) {
        setError("No se encontraron trabajos con ese criterio.");
      } else {
        setError("Error al conectar con el servidor.");
      }
    }
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="mb-8 p-6 rounded-xl bg-white/50 dark:bg-background-dark/50 border border-terracotta/30 shadow-lg"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label
              htmlFor="work-number"
              className="text-sm font-medium text-zinc-400"
            >
              Número de Trabajo
            </label>
            <input
              id="work-number"
              type="text"
              placeholder="Ej: SCCAD-2024-001"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="form-input w-full rounded-lg border-terracotta/40 bg-background-light/50 dark:bg-zinc-800/50 dark:border-terracotta/60 focus:border-primary focus:ring-primary h-12 px-4 text-base mt-1.5"
            />
          </div>

          <button
            type="submit"
            className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-8 bg-primary text-[#d45500] text-base font-bold shadow-md hover:bg-primary/90 transition-colors"
          >
            Consultar
          </button>
        </div>
      </form>
      /* mensajes de error */
      {error && (
        <div className="text-red-500 text-center font-medium">{error}</div>
      )}
      {/* 📋 Resultados */}
      {trabajos.length > 0 && (
        <div className="space-y-4">
          {trabajos.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-xl bg-white/80 border border-terracotta/30 shadow-md"
            >
              <h2 className="text-lg font-bold text-[#ff7a33] mb-2">
                {t.numero_trabajo} — {t.descripcion}
              </h2>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Dirección:</strong> {t.direccion_campo || "—"}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Tipo:</strong> {t.tipo_trabajo?.nombre}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Estado actual:</strong>{" "}
                <span
                  style={{
                    color: t.estado_actual?.color_hex || "#000",
                    fontWeight: "bold",
                  }}
                >
                  {t.estado_actual?.nombre}
                </span>
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Pago:</strong> {t.estado_pago} — <strong>Monto:</strong>{" "}
                ${t.monto_total}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Prioridad:</strong> {t.prioridad}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchForm;
