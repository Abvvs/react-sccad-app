import React, { useState } from "react";
import axios from "axios";

interface Trabajo {
  id: number;
  numero_trabajo: string;
  descripcion: string;
  direccion_campo: string;
  tipo_trabajo?: {
    nombre: string;
  };
  estado_actual?: {
    nombre: string;
    color_hex: string;
  };
  observaciones: string;
  clientes_relacionados: ClienteRelacionado[];
  historial: Historial[];
}
interface Historial {
  id: number;
  estado_trabajo_nombre: string;
  fecha_cambio: string;
  departamento_actual: string;
  observaciones: string;
}
interface ClienteRelacionado {
  id: number;
  cliente_nombre: string;
}
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const SearchForm = () => {
  const [query, setQuery] = useState("");
  const [trabajos, setTrabajos] = useState<Trabajo | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //console.log("Consultando trabajo:", query);
    if (!query) return;

    setLoading(true);
    setError("");
    setTrabajos(null);

    try {
      const res = await axios.get(
        `${API_URL}/trabajos/buscar/?q=${encodeURIComponent(query)}`
      );
      //console.log("Respuesta:", res.data);
      setTrabajos(res.data);
    } catch (err: any) {
      if (err.response?.status === 404) {
        setError(err.response?.data?.message || "No se encontró el trámite.");
      } else {
        setError("Error al conectar con el servidor.");
      }
    } finally {
      setLoading(false);
    }
  };
  // Función para formatear fecha
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("es-EC", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="mb-8 p-6 rounded-xl bg-white/50 dark:bg-background-dark/50 border shadow-lg"
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
            disabled={loading}
            className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-8 bg-primary text-[#d45500] text-base font-bold shadow-md hover:bg-primary/90 transition-colors"
          >
            {loading ? "..." : "Consultar"}
          </button>
        </div>
      </form>
      {error && (
        <div className="text-red-500 text-center font-semibold">{error}</div>
      )}
      {/* 📋 Resultados */}
      {trabajos && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* 📂 Cabecera del Trabajo */}
          <div className="bg-[#ff7a33] rounded-3xl p-6 shadow-sm border border-zinc-100 mb-6">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider">
                  Código de Trabajo
                </span>
                <h2 className="text-3xl font-black text-zinc-800 dark:text-white">
                  {trabajos.numero_trabajo}
                </h2>
                <p className="text-zinc-100 mt-1">
                  {trabajos.tipo_trabajo?.nombre}
                </p>
              </div>
              <div className="text-right">
                <span
                  className="px-4 py-2 rounded-full text-sm font-bold inline-block"
                  style={{
                    backgroundColor: `${trabajos.estado_actual?.color_hex}20`,
                    color: trabajos.estado_actual?.color_hex,
                  }}
                >
                  {trabajos.estado_actual?.nombre}
                </span>
              </div>
            </div>

            {/* Clientes Relacionados */}
            <div className="mt-6 flex flex-wrap gap-2">
              {trabajos.clientes_relacionados.map((c) => (
                <span
                  key={c.id}
                  className="bg-zinc-100 text-zinc-600 px-3 py-1 rounded-lg text-xs font-medium"
                >
                  👤 {c.cliente_nombre}
                </span>
              ))}
            </div>
          </div>

          {/* ⏳ Timeline de Historial */}
          <div className="bg-[#e8d5c4] rounded-3xl p-6 shadow-sm ">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-2 text-[#d45500]">
              <span className="w-2 h-6 bg-[#d45500] rounded-full"></span>
              Historial de Avance
            </h3>

            <div className="relative ml-4 border-l-2 border-zinc-100 space-y-10 pb-4">
              {trabajos.historial.map((h, index) => (
                <div key={h.id} className="relative pl-8">
                  {/* Círculo de la línea de tiempo */}
                  <div
                    className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-4 border-[#d45500]  ${
                      index === 0 ? "bg-primary animate-pulse" : "bg-[#f5f5f0]"
                    }`}
                  ></div>

                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                    <div>
                      <h4
                        className={`font-bold ${
                          index === 0 ? "text-[#d2691e]" : "text-zinc-600"
                        }`}
                      >
                        {h.estado_trabajo_nombre}
                      </h4>
                      <p className="text-sm text-zinc-500">
                        {h.departamento_actual || "Oficina Central"}
                      </p>
                    </div>
                    <time className="text-xs font-mono text-zinc-200 bg-amber-700 px-2 py-1 rounded">
                      {formatDate(h.fecha_cambio)}
                    </time>
                  </div>

                  {h.observaciones && (
                    <div className="mt-2 p-3 bg-zinc-200 rounded-xl text-sm text-zinc-600 italic">
                      "OBSERVACIONES: {h.observaciones}"
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default SearchForm;
