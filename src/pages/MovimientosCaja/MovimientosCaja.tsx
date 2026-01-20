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
import { Edit2, Trash2 } from "lucide-react";
import { useCatalogos } from "../Trabajos/hooks/useCatalogos";

export interface MovimientoCaja {
  id: number;
  tipo_movimiento: "INGRESO" | "EGRESO";
  forma_pago: number | { id: number; nombre: string };
  fecha_movimiento: string;
  monto: string;
  concepto: string;
  responsable?: string;
  observaciones?: string;
}

const INITIAL_FORM_DATA = {
  tipo_movimiento: "",
  forma_pago: "",
  monto: "",
  concepto: "",
  responsable: "",
  observaciones: "",
};
const MovimientosCaja = () => {
  const [movimientos, setMovimientos] = useState<MovimientoCaja[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingMovimiento, setEditingMovimiento] =
    useState<MovimientoCaja | null>(null);
  const [formData, setFormData] =
    useState<Record<string, any>>(INITIAL_FORM_DATA);
  const { formaPago, loadFormaPago } = useCatalogos();

  useEffect(() => {
    getMovimientos();
    loadFormaPago();
  }, [loadFormaPago]);

  // API
  const getMovimientos = () => {
    setLoading(true);
    api
      .get("/movimiento_caja/")
      .then((res) => setMovimientos(res.data))
      .catch((err) => alert(err))
      .finally(() => setLoading(false));
  };

  const createMovimiento = () => {
    api
      .post("/movimiento_caja/", formData)
      .then(() => {
        alert("Movimiento registrado ✅");
        getMovimientos();
        handleCloseModal();
      })
      .catch((err) => alert(JSON.stringify(err.response.data)));
  };

  const updateMovimiento = () => {
    if (!editingMovimiento) return;

    api
      .patch(`/movimiento_caja/${editingMovimiento.id}/`, formData)
      .then(() => {
        alert("Movimiento actualizado ✅");
        getMovimientos();
        handleCloseModal();
      })
      .catch((err) => alert(JSON.stringify(err.response.data)));
  };

  const deleteMovimiento = (mov: MovimientoCaja) => {
    if (!confirm("¿Eliminar este movimiento?")) return;

    api
      .delete(`/movimiento_caja/${mov.id}/`)
      .then(() => getMovimientos())
      .catch((err) => alert(err));
  };

  // Handlers
  const handleSubmit = () => {
    editingMovimiento ? updateMovimiento() : createMovimiento();
  };

  const handleOpenCreateModal = () => {
    setEditingMovimiento(null);
    setFormData(INITIAL_FORM_DATA);
    setShowModal(true);
  };

  const handleOpenEditModal = (mov: MovimientoCaja) => {
    setEditingMovimiento(mov);
    const formaPagoId = typeof mov.forma_pago === 'object' 
    ? mov.forma_pago.id 
    : mov.forma_pago;
    setFormData({
      tipo_movimiento: mov.tipo_movimiento,
      forma_pago: formaPagoId.toString(),
      monto: mov.monto,
      concepto: mov.concepto,
      responsable: mov.responsable || "",
      observaciones: mov.observaciones || "",
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingMovimiento(null);
    setFormData(INITIAL_FORM_DATA);
  };

  // Form
  const formFields: FormField[] = [
    {
      name: "tipo_movimiento",
      label: "Tipo de Movimiento",
      type: "select",
      required: true,
      options: [
        { value: "INGRESO", label: "Ingreso" },
        { value: "EGRESO", label: "Egreso" },
      ],
    },
    {
      name: "forma_pago",
      label: "Forma de Pago",
      type: "select",
      required: true,
      options: formaPago.map((fp) => ({
        value: fp.id.toString(),
        label: fp.nombre,
      })),
    },
    { name: "monto", label: "Monto", type: "number", required: true },
    { name: "concepto", label: "Concepto", type: "textarea", required: true },
    { name: "responsable", label: "Responsable", type: "text" },
    { name: "observaciones", label: "Observaciones", type: "textarea" },
  ];

  // Table
  const tableColumns: TableColumn<MovimientoCaja>[] = [
    { key: "fecha_movimiento", label: "Fecha" },
    { key: "tipo_movimiento", label: "Tipo" },
    { key: "monto", label: "Monto" },
    { key: "concepto", label: "Concepto" },
  ];

  const tableActions: TableAction<MovimientoCaja>[] = [
    {
      label: "",
      onClick: handleOpenEditModal,
      variant: "primary",
      icon: <Edit2 className="w-4 h-4" />,
    },
    {
      label: "",
      onClick: deleteMovimiento,
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
          + Registrar Movimiento
        </button>
      </div>

      <Modal
        open={showModal}
        onClose={handleCloseModal}
        title="Registrar / Editar Movimiento"
      >
        <DynamicForm
          title=""
          fields={formFields}
          formData={formData}
          onChange={(name, value) =>
            setFormData({ ...formData, [name]: value })
          }
          onSubmit={handleSubmit}
          submitText={
            editingMovimiento ? "Guardar Cambios" : "Registrar Movimiento"
          }
        />
      </Modal>

      {loading && (
        <p className="text-center text-[#6b7c5d] py-3">Cargando...</p>
      )}

      <DynamicTable
        title="Movimientos de Caja"
        columns={tableColumns}
        data={movimientos}
        actions={tableActions}
        keyExtractor={(mov) => mov.id.toString()}
        emptyMessage="No hay movimientos registrados."
      />
    </div>
  );
};

export default MovimientosCaja;