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
import { Trash2, Edit2 } from "lucide-react";

export interface Empleado {
  id: number;
  nombre: string;
  cedula_ruc?: string;
  telefono?: string;
  cuenta_bancaria?: string;
  banco?: string;
  estado: boolean;
}

const INITIAL_FORM_DATA = {
  nombre: "",
  cedula_ruc: "",
  telefono: "",
  banco: "",
  cuenta_bancaria: "",
};

const Empleados = () => {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingEmpleado, setEditingEmpleado] = useState<Empleado | null>(null);
  const [formData, setFormData] =
    useState<Record<string, any>>(INITIAL_FORM_DATA);
  useEffect(() => {
    getEmpleados();
  }, []);
  const getEmpleados = () => {
    setLoading(true);
    api
      .get("/empleados/")
      .then((res) => setEmpleados(res.data))
      .catch((err) => alert(err?.response?.data ? JSON.stringify(err.response.data) : err.message))
      .finally(() => setLoading(false));
  };
  const createEmpleado = () => {
    api
      .post("/empleados/", formData)
      .then(() => {
        alert("Empleado registrado ✅");
        getEmpleados();
        handleCloseModal();
      })
      .catch((err) => alert(JSON.stringify(err?.response?.data ?? err.message)));
  };
  const toggleEstadoEmpleado = (empleado: Empleado) => {
    api
      .patch(`/empleados/${empleado.id}/inactivar/`, {
        estado: !empleado.estado,
      })
      .then(() => getEmpleados())
      .catch((err) => alert(err?.response?.data ? JSON.stringify(err.response.data) : err.message));
  };
  const updateEmpleado = () => {
    if (!editingEmpleado) return;

    api
      .patch(`/empleados/${editingEmpleado.id}/`, formData)
      .then(() => {
        alert("Empleado actualizado ✅");
        getEmpleados();
        handleCloseModal();
      })
      .catch((err) => alert(JSON.stringify(err?.response?.data ?? err.message)));
  };
  // HANDLERS
  const handleOpenCreateModal = () => {
    setEditingEmpleado(null);
    setFormData(INITIAL_FORM_DATA);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingEmpleado(null);
    setFormData(INITIAL_FORM_DATA);
  };
  // Campos del formulario
  const formFields: FormField[] = [
    { name: "nombre", label: "Nombre", type: "text", required: true },
    { name: "cedula_ruc", label: "Cédula/RUC", type: "text" },
    { name: "telefono", label: "Teléfono", type: "text" },
    { name: "banco", label: "Banco", type: "text" },
    { name: "cuenta_bancaria", label: "Cuenta Bancaria", type: "text" },
  ];
  const tableColumns: TableColumn<Empleado>[] = [
    { key: "nombre", label: "Nombre" },
    { key: "cedula_ruc", label: "Cédula/RUC" },
    { key: "telefono", label: "Teléfono" },
    { key: "banco", label: "Banco" },
    { key: "cuenta_bancaria", label: "Cuenta Bancaria" },
    
  ];
  const tableActions: TableAction<Empleado>[] = [
    {
      label: "Eliminar",
      onClick: (empleado) => toggleEstadoEmpleado(empleado),
      variant: "danger",
      icon: <Trash2 className="w-4 h-4" />,
    },
    {
      label: "Editar",
      onClick: (empleado) => {
        setEditingEmpleado(empleado);
        setFormData({
          nombre: empleado.nombre,
          cedula_ruc: empleado.cedula_ruc,
          telefono: empleado.telefono,
          banco: empleado.banco,
          cuenta_bancaria: empleado.cuenta_bancaria,
        });
        setShowModal(true);
      },
      variant: "primary",
      icon: <Edit2 className="w-4 h-4" />,
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <div className="flex justify-end mb-4">
        <button
          onClick={handleOpenCreateModal}
          className="bg-[#6b7c5d] hover:bg-[#4a5a3d] text-white px-4 py-2 rounded-lg font-medium transition"
        >
          + Registrar Empleado
        </button>
      </div>
      {/* Modal */}
      <Modal
        open={showModal}
        onClose={handleCloseModal}
        title={editingEmpleado ? "Editar Empleado" : "Registrar Empleado"}
      >
        <DynamicForm
          title=""
          fields={formFields}
          formData={formData}
          onChange={(name, value) =>
            setFormData({ ...formData, [name]: value })
          }
          onSubmit={() => {
            if (editingEmpleado) {
              updateEmpleado();
            } else {
              createEmpleado();
            }
          }}
          submitText={editingEmpleado ? "Guardar Cambios" : "Registrar Empleado"}
        />
      </Modal>

      {loading && (
        <p className="text-center text-[#6b7c5d] py-3">Cargando...</p>
      )}

      <DynamicTable
        title="Lista de Empleados"
        columns={tableColumns}
        data={empleados}
        actions={tableActions}
        keyExtractor={(emp) => emp.id.toString()}
        emptyMessage="No hay empleados registrados."
      />
    </div>
  );
};
export default Empleados;
