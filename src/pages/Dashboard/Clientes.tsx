import { useState, useEffect } from "react";
import api from "../../api";
import DynamicForm, {
  type FormField,
} from "../../components/Forms/DynamicForm";
import DynamicTable, {
  type TableColumn,
  type TableAction,
} from "../../components/Tables/DynamicTable";
import Modal from "../../components/Modals/Modal";
import { Trash2, Edit2, Info } from "lucide-react";

export interface Clientes {
  id: number;
  nombre: string;
  razon_social?: string;
  tipo_identificacion?: string;
  identificacion?: string;
  telefono?: string;
  observaciones?: string;
  estado: boolean;
}
interface Choices {
  identificaciones: Array<[string, string]>;
}

const INITIAL_FORM_DATA = {
  nombre: "",
  razon_social: "",
  tipo_identificacion: "",
  identificacion: "",
  telefono: "",
  observaciones: "",
};

const Clientes = () => {
  const [clientes, setClientes] = useState<Clientes[]>([]);
  const [loading, setLoading] = useState(false);
  const [choices, setChoices] = useState<Choices>({
    identificaciones: [],
  });
  const [showModal, setShowModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState<Clientes | null>(null);
  const [editingCliente, setEditingCliente] = useState<Clientes | null>(null);
  const [formData, setFormData] =
    useState<Record<string, any>>(INITIAL_FORM_DATA);

  useEffect(() => {
    getClientes();
    getChoices();
  }, []);
  //API CALLS
  const getChoices = () => {
    api
      .get("/clientes/choices/")
      .then((res) => setChoices(res.data))
      .catch((err) => console.log(err));
  };
  const getClientes = () => {
    setLoading(true);
    api
      .get("/clientes/")
      .then((res) => setClientes(res.data))
      .catch((err) => alert(err?.response?.data ? JSON.stringify(err.response.data) : err.message))
      .finally(() => setLoading(false));
  };
  const createCliente = () => {
    api
      .post("/clientes/", formData)
      .then(() => {
        alert("Cliente registrado ✅");
        getClientes();
        handleCloseModal();
      })
      .catch((err) => alert(JSON.stringify(err?.response?.data ?? err.message)));
  };
  const toggleEstadoCliente = (cliente: Clientes) => {
    api
      .patch(`/clientes/${cliente.id}/inactivar/`, {
        estado: !cliente.estado,
      })
      .then(() => getClientes())
      .catch((err) => alert(err?.response?.data ? JSON.stringify(err.response.data) : err.message));
  };
  const updateCliente = () => {
    if (!editingCliente) return;

    api
      .patch(`/clientes/${editingCliente.id}/`, formData)
      .then(() => {
        alert("Cliente actualizado ✅");
        getClientes();
        handleCloseModal();
      })
      .catch((err) => alert(JSON.stringify(err?.response?.data ?? err.message)));
  };
  //HANDLERS
  const handleViewInfo = (cliente: Clientes) => {
    api
      .get(`/clientes/${cliente.id}/`)
      .then((res) => {
        setSelectedCliente(res.data);
        setShowInfoModal(true);
      })
      .catch(() => alert("No se pudo obtener la información"));
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCliente(null);
    setFormData(INITIAL_FORM_DATA);
  };
  const handleCloseInfoModal = () => {
    setShowInfoModal(false);
    setSelectedCliente(null);
  };
  const handleSubmit = () => {
    if (editingCliente) {
      updateCliente();
    } else {
      createCliente();
    }
  };
  const handleOpenCreateModal = () => {
    setEditingCliente(null);
    setFormData(INITIAL_FORM_DATA);
    setShowModal(true);
  };

  const handleOpenEditModal = (cliente: Clientes) => {
    setEditingCliente(cliente);
    setFormData({
      nombre: cliente.nombre,
      razon_social: cliente.razon_social || "",
      tipo_identificacion: cliente.tipo_identificacion || "",
      identificacion: cliente.identificacion || "",
      telefono: cliente.telefono || "",
      observaciones: cliente.observaciones || "",
    });
    setShowModal(true);
  };
  const formFields: FormField[] = [
    { name: "nombre", label: "Nombre", type: "text", required: true },
    { name: "razon_social", label: "Razón Social", type: "text" },
    {
      name: "tipo_identificacion",
      label: "Tipo Identificación",
      type: "select",
      options: choices.identificaciones.map(([value, label]) => ({
        value,
        label,
      })),
    },
    { name: "identificacion", label: "Cédula/RUC", type: "text" },
    { name: "telefono", label: "Telefono", type: "text" },
    { name: "observaciones", label: "Notas", type: "textarea" },
  ];
  const tableColumns: TableColumn<Clientes>[] = [
    { key: "nombre", label: "Nombre" },
    { key: "telefono", label: "Teléfono" },
    { key: "observaciones", label: "Notas" },
  ];
  //falta el table actions
  const tableActions: TableAction<Clientes>[] = [
    {
      label: "",
      onClick: (cliente) => handleViewInfo(cliente),
      variant: "secondary",
      icon: <Info className="w-4 h-4" />,
    },
    {
      label: "",
      onClick: handleOpenEditModal,
      variant: "primary",
      icon: <Edit2 className="w-4 h-4" />,
    },
    {
      label: "",
      onClick: (clientes) => toggleEstadoCliente(clientes),
      variant: "danger",
      icon: <Trash2 className="w-4 h-4" />,
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <div className="flex justify-end mb-4">
        <button
          onClick={handleOpenCreateModal}
          className="bg-[#6b7c5d] hover:bg-[#4a5a3d] text-white px-4 py-2 rounded-lg font-medium transition"
        >
          + Registrar Cliente
        </button>
      </div>
      {/* Modal CREAR/ EDITAR*/}
      <Modal
        open={showModal}
        onClose={handleCloseModal}
        title="Registrar/Actualizar Cliente"
      >
        <DynamicForm
          title=""
          fields={formFields}
          formData={formData}
          onChange={(name, value) =>
            setFormData({ ...formData, [name]: value })
          }
          onSubmit={handleSubmit}
          submitText={editingCliente ? "Guardar Cambios" : "Registrar Cliente"}
        />
      </Modal>
      {/* Modal de Información Completa */}
      <Modal
        open={showInfoModal}
        onClose={handleCloseInfoModal}
        title="Información del Cliente"
        width="max-w-xl"
      >
        {selectedCliente && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-600">Nombre:</p>
                <p className="text-base text-gray-900">
                  {selectedCliente.nombre}
                </p>
              </div>

              {selectedCliente.razon_social && (
                <div>
                  <p className="text-sm font-semibold text-gray-600">
                    Razón Social:
                  </p>
                  <p className="text-base text-gray-900">
                    {selectedCliente.razon_social}
                  </p>
                </div>
              )}

              {selectedCliente.tipo_identificacion && (
                <div>
                  <p className="text-sm font-semibold text-gray-600">
                    Tipo Identificación:
                  </p>
                  <p className="text-base text-gray-900">
                    {selectedCliente.tipo_identificacion}
                  </p>
                </div>
              )}

              {selectedCliente.identificacion && (
                <div>
                  <p className="text-sm font-semibold text-gray-600">
                    Identificación:
                  </p>
                  <p className="text-base text-gray-900">
                    {selectedCliente.identificacion}
                  </p>
                </div>
              )}

              {selectedCliente.telefono && (
                <div>
                  <p className="text-sm font-semibold text-gray-600">
                    Teléfono:
                  </p>
                  <p className="text-base text-gray-900">
                    {selectedCliente.telefono}
                  </p>
                </div>
              )}

              <div>
                <p className="text-sm font-semibold text-gray-600">Estado:</p>
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    selectedCliente.estado
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {selectedCliente.estado ? "Activo" : "Inactivo"}
                </span>
              </div>
            </div>

            {selectedCliente.observaciones && (
              <div>
                <p className="text-sm font-semibold text-gray-600">
                  Observaciones:
                </p>
                <p className="text-base text-gray-900 bg-gray-50 p-3 rounded-lg">
                  {selectedCliente.observaciones}
                </p>
              </div>
            )}
          </div>
        )}
      </Modal>

      {loading && (
        <p className="text-center text-[#6b7c5d] py-3">Cargando...</p>
      )}

      <DynamicTable
        title="Lista de Clientes"
        columns={tableColumns}
        data={clientes}
        actions={tableActions}
        keyExtractor={(emp) => emp.id.toString()}
        emptyMessage="No hay clientes registrados."
      />
    </div>
  );
};
export default Clientes;
