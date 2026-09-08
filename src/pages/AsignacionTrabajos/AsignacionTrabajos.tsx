import { useEffect, useState } from "react";
import api from "../../api";
import DynamicForm, {
  type FormField,
} from "../../components/Forms/DynamicForm";
import DynamicTable, {
  type TableColumn,
  type TableAction,
} from "../../components/Tables/DynamicTable";
import Modal from "../../components/Modals/Modal";
import { Edit2, Trash2 } from "lucide-react";

export interface Asignacion {
  id: number;
  trabajo: number;
  trabajo_codigo?: string;
  trabajo_descripcion?: string;
  empleado: number;
  empleado_nombre?: string;
  rol: number;
  rol_nombre?: string;
  fecha: string;
  observaciones?: string;
}

const INITIAL_FORM_DATA = {
  trabajo: "",
  empleado: "",
  rol: "",
  fecha: "",
  observaciones: "",
};

const AsignacionTrabajos = () => {
  /* =======================
     STATES
  ======================= */
  const [data, setData] = useState<Asignacion[]>([]);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Asignacion | null>(null);
  const [formData, setFormData] =
    useState<Record<string, any>>(INITIAL_FORM_DATA);

  const [catalogos, setCatalogos] = useState({
    trabajos: [],
    empleados: [],
    roles: [],
  });
    useEffect(() => {
    fetchAsignaciones();
    fetchCatalogos();
  }, []);

  const fetchAsignaciones = () => {
    setLoading(true);
    api
      .get("/trabajos/asignacion_trabajo/")
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  };

  const fetchCatalogos = () => {
    Promise.all([
      api.get("/trabajos/"),
      api.get("/empleados/"),
      api.get("/trabajos/roles/"),
    ]).then(([trabajos, empleados, roles]) => {
        setCatalogos({
            trabajos: Array.isArray(trabajos.data)
        ? trabajos.data
        : trabajos.data.results ?? [],

      empleados: Array.isArray(empleados.data)
        ? empleados.data
        : empleados.data.results ?? [],

      roles: Array.isArray(roles.data)
        ? roles.data
        : roles.data.roles ?? roles.data.results ?? [],
        });
        });
    };
      /* =======================
     CRUD
  ======================= */
  const handleSubmit = () => {
  const payload = {
    ...formData,
    trabajo: Number(formData.trabajo),
    empleado: Number(formData.empleado),
    rol: Number(formData.rol),
    fecha: `${formData.fecha}T00:00:00`,
  };

  if (editing) {
    api
      .patch(`/trabajos/asignacion_trabajo/${editing.id}/`, payload)
      .then(() => {
        fetchAsignaciones();
        handleClose();
      })
      .catch((err) => {
        console.error(err.response?.data);
        alert(JSON.stringify(err.response?.data));
      });
  } else {
    api
      .post("/trabajos/asignacion_trabajo/", payload)
      .then(() => {
        fetchAsignaciones();
        handleClose();
      })
      .catch((err) => {
        console.error(err.response?.data);
        alert(JSON.stringify(err.response?.data));
      });
  }
};

  const handleDelete = (row: Asignacion) => {
    if (!confirm("¿Eliminar esta asignación?")) return;

    api.delete(`/trabajos/asignacion_trabajo/${row.id}/`).then(fetchAsignaciones);
  };

  /* =======================
     MODAL HANDLERS
  ======================= */
  const handleOpenCreate = () => {
    setEditing(null);
    setFormData(INITIAL_FORM_DATA);
    setShowModal(true);
  };

  const handleOpenEdit = (row: Asignacion) => {
    setEditing(row);
    setFormData({
      trabajo: row.trabajo.toString(),
      empleado: row.empleado.toString(),
      rol: row.rol.toString(),
      fecha: row.fecha,
      observaciones: row.observaciones || "",
    });
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setEditing(null);
    setFormData(INITIAL_FORM_DATA);
  };
   const formFields: FormField[] = [
    {
      name: "trabajo",
      label: "Trabajo",
      type: "select",
      required: true,
      options: catalogos.trabajos.map((t: any) => ({
        value: t.id.toString(),
        label: `${t.numero_trabajo} · ${t.tipo_trabajo.nombre} · ${t.descripcion}`,
      })),
    },
    {
      name: "empleado",
      label: "Empleado",
      type: "select",
      required: true,
      options: catalogos.empleados.map((e: any) => ({
        value: e.id.toString(),
        label: e.nombre,
      })),
    },
    {
      name: "rol",
      label: "Rol",
      type: "select",
      required: true,
      options: Array.isArray(catalogos.roles)
        ? catalogos.roles.map((r: any) => ({
            value: r.id.toString(),
            label: r.label,
            }))
        : [],
    },
    {
      name: "fecha",
      label: "Fecha",
      type: "date",
      required: true,
    },
    {
      name: "observaciones",
      label: "Observaciones",
      type: "textarea",
    },
  ];

  /* =======================
     TABLE
  ======================= */
  const columns: TableColumn<Asignacion>[] = [
    { key: "fecha", label: "Fecha" },
    { key: "empleado_nombre", label: "Empleado" },
    { key: "rol_nombre", label: "Rol" },
    { key: "trabajo_codigo", label: "Trabajo" },
    { key: "trabajo_descripcion", label: "Descripción" },
  ];

  const actions: TableAction<Asignacion>[] = [
    {
      label: "",
      onClick: handleOpenEdit,
      icon: <Edit2 className="w-4 h-4" />,
      variant: "primary",
    },
    {
      label: "",
      onClick: handleDelete,
      icon: <Trash2 className="w-4 h-4" />,
      variant: "danger",
    },
  ];

  /* =======================
     RENDER
  ======================= */
  return (
    <div className="p-6">
      <div className="flex justify-end mb-4">
        <button
          onClick={handleOpenCreate}
          className="bg-[#6b7c5d] hover:bg-[#4a5a3d] text-white px-4 py-2 rounded-lg"
        >
          + Asignar Empleado
        </button>
      </div>

      {loading && (
        <p className="text-center text-[#6b7c5d] py-3">Cargando...</p>
      )}

      <DynamicTable
        title="Asignación de Empleados a Trabajos"
        columns={columns}
        data={data}
        actions={actions}
        keyExtractor={(row) => row.id.toString()}
        emptyMessage="No hay asignaciones registradas."
      />

      <Modal
        open={showModal}
        onClose={handleClose}
        title={editing ? "Editar asignación" : "Nueva asignación"}
      >
        <DynamicForm
          title=""
          fields={formFields}
          formData={formData}
          onChange={(name, value) =>
            setFormData({ ...formData, [name]: value })
          }
          onSubmit={handleSubmit}
          submitText={editing ? "Guardar cambios" : "Asignar"}
        />
      </Modal>
    </div>
  );
}

export default AsignacionTrabajos;
