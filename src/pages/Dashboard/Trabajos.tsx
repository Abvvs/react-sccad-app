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
import { Trash2 } from "lucide-react";
interface Trabajo {
  id: number;
  numero_trabajo: string;
  descripcion: string;
  tipo_trabajo: { id: number; nombre: string };
}
interface TipoTrabajo {
  id: number;
  nombre: string;
}

const Trabajos = () => {
  const [trabajos, setTrabajos] = useState<Trabajo[]>([]);
  const [tiposTrabajo, setTiposTrabajo] = useState<TipoTrabajo[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({
    numero_trabajo: "",
    descripcion: "",
    tipo_trabajo_id: "",
  });
  useEffect(() => {
    getTrabajos();
    getTiposTrabajo();
  }, []);

  const getTrabajos = () => {
    api
      .get("/trabajos/")
      .then((res) => setTrabajos(res.data))
      .catch((err) => alert(err))
      .finally(() => setLoading(false));
  };
  const getTiposTrabajo = () => {
    api
      .get("/trabajos/catalogos/tipo-trabajo/") // Ajusta si tu endpoint es diferente
      .then((res) => setTiposTrabajo(res.data))
      .catch((err) => alert(err));
  };
  const deleteTrabajos = (id: number) => {
    api
      .delete(`/trabajos/eliminar/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Trabajo se eliminó correctamente");
        else alert("Error al eliminar el trabajo");
        getTrabajos();
      })
      .catch((error) => alert(error));
  };
  const createTrabajo = () => {
    if (
      !formData.numero_trabajo ||
      !formData.descripcion ||
      !formData.tipo_trabajo_id
    ) {
      alert("Faltan datos");
      return;
    }
    api
      .post("/trabajos/", {
        numero_trabajo: formData.numero_trabajo,
        descripcion: formData.descripcion,
        tipo_trabajo_id: Number(formData.tipo_trabajo_id), // debe ser un ID existente en BD
      })
      .then(() => {
        alert("Trabajo creado correctamente");
        getTrabajos(); // refrescar lista
        // Reset form
        setFormData({
          numero_trabajo: "",
          descripcion: "",
          tipo_trabajo_id: "",
        });
      })
      .catch((err) => alert(JSON.stringify(err.response.data)));
  };
  // Configuración del formulario
  const formFields: FormField[] = [
    {
      name: "numero_trabajo",
      label: "Número de Trabajo",
      type: "text",
      placeholder: "Ej: T-2024-001",
      required: true,
    },
    {
      name: "descripcion",
      label: "Descripción",
      type: "textarea",
      placeholder: "Describe el trabajo a realizar...",
      required: true,
      rows: 4,
    },
    {
      name: "tipo_trabajo_id",
      label: "Tipo de Trabajo",
      type: "select",
      required: true,
      options: tiposTrabajo.map((tipo) => ({
        value: tipo.id,
        label: tipo.nombre,
      })),
    },
  ];
  // Configuración de la tabla
  const tableColumns: TableColumn<Trabajo>[] = [
    {
      key: "numero_trabajo",
      label: "Número",
      width: "20%",
    },
    {
      key: "descripcion",
      label: "Descripción",
      width: "50%",
    },
    {
      key: "tipo_trabajo.nombre",
      label: "Tipo",
      width: "30%",
      render: (trabajo) => (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#a8b89f] text-[#4a5a3d]">
          {trabajo.tipo_trabajo?.nombre || "-"}
        </span>
      ),
    },
  ];

  const tableActions: TableAction<Trabajo>[] = [
    {
      label: "Eliminar",
      onClick: (trabajo) => deleteTrabajos(trabajo.id),
      variant: "danger",
      icon: <Trash2 className="w-4 h-4" />,
    },
  ];
  return (
    <div style={{ padding: "20px" }}>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#6b7c5d] hover:bg-[#4a5a3d] text-white px-4 py-2 rounded-lg font-medium transition"
        >
          + Crear Nuevo Trabajo
        </button>
      </div>
      {/* Formulario Modal */}
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Crear Nuevo Trabajo"
      >
        <DynamicForm
          title=""
          fields={formFields}
          formData={formData}
          onChange={(name, value) =>
            setFormData({ ...formData, [name]: value })
          }
          onSubmit={() => {
            createTrabajo();
            setShowModal(false); // Cierra el modal después de crear
          }}
          submitText="Crear Trabajo"
        />
      </Modal>
      <br></br>
      {/* Tabla */}
      {loading && (
        <div className="w-full text-center py-3 text-[#6b7c5d] font-medium">
          Cargando...
        </div>
      )}
      <DynamicTable
        title="Lista de Trabajos"
        columns={tableColumns}
        data={trabajos}
        actions={tableActions}
        keyExtractor={(trabajo) => trabajo.id.toString()}
        emptyMessage="No hay trabajos registrados. ¡Crea el primero!"
      />
    </div>
  );
};

export default Trabajos;
