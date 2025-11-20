import React from "react";
import Modal from "../../../components/Modals/Modal";
import { Plus } from "lucide-react";
import type { HistorialItem } from "../types/trabajos";

interface ViewHistorialTrabajoModalProps {
  open: boolean;
  onClose: () => void;
  historial: HistorialItem[];
  handleOpenCreateHistorialModal: () => void;
}

const ViewHistorialTrabajoModal: React.FC<ViewHistorialTrabajoModalProps> = ({
  open,
  onClose,
  historial,
  handleOpenCreateHistorialModal,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Historial del Trabajo"
      width="max-w-xl"
    >
      <div className="mb-4 flex justify-end">
        <button
          onClick={handleOpenCreateHistorialModal}
          className="bg-[#6b7c5d] hover:bg-[#4a5a3d] text-white px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Agregar Estado
        </button>
      </div>

      {historial.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          No hay historial registrado
        </p>
      ) : (
        <div className="space-y-4">
          {historial.map((item) => (
            <div
              key={item.id}
              className="border-l-4 border-[#6b7c5d] pl-4 py-3 bg-gray-50 rounded-lg"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-semibold text-[#4a5a3d] text-base">
                  {item.estado_trabajo_nombre}
                </span>

                <span className="text-sm text-gray-500">
                  {new Date(item.fecha_cambio).toLocaleDateString()}
                </span>
              </div>

              {item.observaciones && (
                <p className="text-sm text-gray-700 bg-white p-2 rounded mt-2">
                  {item.observaciones}
                </p>
              )}

              {item.departamento_actual && (
                <p className="text-xs text-gray-500 mt-1 italic">
                  Departamento: {item.departamento_actual}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
};

export default ViewHistorialTrabajoModal;