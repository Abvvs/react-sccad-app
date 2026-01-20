import Modal from "../../../components/Modals/Modal";
import type { Trabajo } from "../types/trabajos";
import { Plus, Trash2 } from "lucide-react";

interface ViewInfoTrabajoModalProps {
  open: boolean;
  onClose: () => void;
  selectedTrabajo: Trabajo | null;
  handleOpenAgregarClienteModal: () => void;
  eliminarClienteTrabajo: (clienteId: number) => void;
  handleOpenAgregarPagoModal: () => void;
  eliminarPago: (pagoId: number) => void;
}

const ViewInfoTrabajoModal: React.FC<ViewInfoTrabajoModalProps> = ({
  open,
  onClose,
  selectedTrabajo,
  handleOpenAgregarClienteModal,
  eliminarClienteTrabajo,
  handleOpenAgregarPagoModal,
  eliminarPago,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Información del Trabajo"
      width="max-w-3xl"
    >
      {selectedTrabajo && (
        <div className="space-y-6">
          {/* Header */}
          <div className="bg-linear-to-br from-[#6b7c5d] to-[#4a5a3d] rounded-lg p-6 text-white">
            <h3 className="text-2xl font-bold mb-2">
              {selectedTrabajo.numero_trabajo}
            </h3>
            <p className="text-sm opacity-90">
              {selectedTrabajo.tipo_trabajo?.nombre}
            </p>
          </div>

          {/* Detalles */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-600">
                Descripción:
              </p>
              <p className="text-base text-gray-900">
                {selectedTrabajo.descripcion}
              </p>
            </div>

            {selectedTrabajo.direccion_campo && (
              <div>
                <p className="text-sm font-semibold text-gray-600">
                  Dirección Campo:
                </p>
                <p className="text-base text-gray-900">
                  {selectedTrabajo.direccion_campo}
                </p>
              </div>
            )}

            {selectedTrabajo.monto_total && (
              <div>
                <p className="text-sm font-semibold text-gray-600">
                  Monto Total:
                </p>
                <p className="text-base text-gray-900">
                  ${Number(selectedTrabajo.monto_total).toFixed(2)}
                </p>
              </div>
            )}
            {selectedTrabajo.estado_pago && (
              <div>
                <p className="text-sm font-semibold text-gray-600">
                  Estado de Pago:
                </p>
                <p className="text-base text-gray-900">
                  {selectedTrabajo.estado_pago}
                </p>
              </div>
            )}
            {selectedTrabajo.saldo_pendiente && (
              <div>
                <p className="text-sm font-semibold text-gray-600">
                  Saldo Pendiente:
                </p>
                <p className="text-base text-gray-900">
                  {selectedTrabajo.saldo_pendiente}
                </p>
              </div>
            )}

            {selectedTrabajo.estado_actual && (
              <div>
                <p className="text-sm font-semibold text-gray-600">
                  Estado Actual:
                </p>
                <span
                  className="inline-flex px-3 py-1 text-sm font-semibold rounded-full"
                  style={{
                    backgroundColor: selectedTrabajo.estado_actual.color_hex
                      ? `${selectedTrabajo.estado_actual.color_hex}20`
                      : "#e5e7eb",
                    color: selectedTrabajo.estado_actual.color_hex || "#374151",
                  }}
                >
                  {selectedTrabajo.estado_actual.nombre}
                </span>
              </div>
            )}
          </div>

          {selectedTrabajo.observaciones && (
            <div>
              <p className="text-sm font-semibold text-gray-600">
                Observaciones:
              </p>
              <p className="text-base text-gray-900 bg-gray-50 p-3 rounded-lg">
                {selectedTrabajo.observaciones}
              </p>
            </div>
          )}

          {/* Clientes Relacionados */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-lg font-semibold text-[#4a5a3d]">
                Clientes Relacionados
              </h4>

              <button
                onClick={handleOpenAgregarClienteModal}
                className="flex items-center gap-1 bg-[#6b7c5d] hover:bg-[#4a5a3d] text-white px-3 py-1 rounded-lg text-sm font-medium transition"
              >
                <Plus className="w-4 h-4" />
                Agregar Cliente
              </button>
            </div>

            {selectedTrabajo.clientes_relacionados?.length ? (
              <div className="space-y-3">
                {selectedTrabajo.clientes_relacionados.map((cliente) => (
                  <div
                    key={cliente.id}
                    className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {cliente.cliente_nombre}
                        </p>
                        <p className="text-sm text-gray-600">
                          {cliente.cliente_telefono}
                        </p>
                      </div>

                      <span className="inline-flex px-2 py-1 text-xs font-medium bg-[#a8b89f] text-[#4a5a3d] rounded-full">
                        {cliente.tipo_etiqueta}
                      </span>

                      <button
                        onClick={() => eliminarClienteTrabajo(cliente.id)}
                        className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 transition"
                        title="Eliminar cliente"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {cliente.observaciones && (
                      <p className="text-sm text-gray-600 mt-2">
                        {cliente.observaciones}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-4 bg-gray-50 rounded-lg mt-3">
                No hay clientes relacionados. Agrega el primero.
              </p>
            )}
          </div>
          {/* Pagos Relacionados */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-lg font-semibold text-[#4a5a3d]">Pagos</h4>

              <button
                onClick={handleOpenAgregarPagoModal}
                className="flex items-center gap-1 bg-[#6b7c5d] hover:bg-[#4a5a3d] text-white px-3 py-1 rounded-lg text-sm font-medium transition"
              >
                <Plus className="w-4 h-4" />
                Agregar Pago
              </button>
            </div>

            {selectedTrabajo.cuenta?.pagos?.length ? (
              <div className="space-y-3">
                {selectedTrabajo.cuenta.pagos.map((pago) => (
                  <div
                    key={pago.id}
                    className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-900">
                          ${Number(pago.monto).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-600">
                          {new Date(pago.fecha_pago).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-500">
                          Método: {pago.forma_pago_nombre}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                          Pago
                        </span>
                        <button
                          onClick={() => eliminarPago(pago.id)}
                          className="inline-flex text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 transition"
                          title="Eliminar pago"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    {pago.observaciones && (
                      <p className="text-sm text-gray-600 mt-1">
                        {pago.observaciones}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-4 bg-gray-50 rounded-lg mt-3">
                No hay pagos registrados. Agrega el primero.
              </p>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ViewInfoTrabajoModal;
