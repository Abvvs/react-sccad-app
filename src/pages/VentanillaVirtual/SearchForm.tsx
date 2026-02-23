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
        `${API_URL}/trabajos/buscar/?q=${encodeURIComponent(query)}`,
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
  if (loading) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        Consultando trámite...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="mb-8 bg-card border border-border shadow-md rounded-2xl p-8"
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
              className="w-full h-12 px-4 mt-2 rounded-lg 
             bg-input-background 
             border border-border 
             focus:outline-none 
             focus:ring-2 focus:ring-ring 
             focus:border-primary 
             transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="h-12 px-8 rounded-lg 
           bg-primary text-primary-foreground 
           font-semibold shadow-sm 
           hover:bg-primary/90 
           transition disabled:opacity-50"
          >
            {loading ? "..." : "Consultar"}
          </button>
        </div>
      </form>
      {error && (
        <div className="p-4 rounded-lg bg-destructive/10 text-destructive border border-destructive/20 text-center font-medium">
          {error}
        </div>
      )}
      {/* 📋 Resultados */}
      {trabajos && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* 📂 Cabecera del Trabajo */}
          <div className="bg-primary/50 border border-primary/20 rounded-3xl p-6 shadow-sm mb-6">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider">
                  Código de Trabajo
                </span>
                <h2 className="text-3xl font-bold text-foreground">
                  {trabajos.numero_trabajo}
                </h2>
                <p className="text-zinc-100 mt-1">
                  {trabajos.tipo_trabajo?.nombre}
                </p>
              </div>
              <div className="text-right">
                <span
                  className="px-4 py-2 rounded-full text-sm font-semibold bg-muted text-foreground"
                  style={{
                    backgroundColor: `${trabajos.estado_actual?.color_hex}90`,
                    color: "text-muted-foreground",
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
          <div className="bg-card border border-border shadow-sm rounded-2xl p-8 ">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-2 text-primary">
              <span className="w-2 h-6 bg-primary rounded-full"></span>
              Historial de Avance
            </h3>

            <div className="relative ml-4 border-l-2 border-border space-y-10 pb-4">
              {trabajos.historial.map((h, index) => (
                <div key={h.id} className="relative pl-8">
                  {/* Círculo de la línea de tiempo */}
                  <div
                    className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-4 border-primary  ${
                      index === 0 ? "bg-primary animate-pulse" : "bg-[#f5f5f0]"
                    }`}
                  ></div>

                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                    <div>
                      <h4
                        className={`font-bold ${
                          index === 0 ? "text-primary" : "text-zinc-600"
                        }`}
                      >
                        {h.estado_trabajo_nombre}
                      </h4>
                      <p className="text-sm text-zinc-500">
                        {h.departamento_actual || "Oficina Central"}
                      </p>
                    </div>
                    <time className="text-xs font-mono bg-muted text-muted-foreground px-2 py-1 rounded">
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
