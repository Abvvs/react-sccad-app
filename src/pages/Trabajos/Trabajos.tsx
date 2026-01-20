import { useState, useEffect } from "react";
import api from "../../api";
import { type FormField } from "../../components/Forms/DynamicForm";
import DynamicTable, {
  type TableColumn,
  type TableAction,
} from "../../components/Tables/DynamicTable";
import type {
  Trabajo,
} from "./types/trabajos";
import { useCatalogos } from "./hooks/useCatalogos";
import { useTrabajos } from "./hooks/useTrabajos";
import { useHistorial } from "./hooks/useHistorial";
import { useClientesTrabajo } from "./hooks/useClientesTrabajo";
import { usePagos } from "./hooks/usePagos";
import { Trash2, Pencil, History, Info } from "lucide-react";
import TrabajoFormModal from "./components/TrabajoFormModal";
import ViewInfoTrabajoModal from "./components/ViewInfoTrabajoModal";
import ViewHistorialTrabajoModal from "./components/ViewHistorialTrabajoModal";
import CreateHistorialFormModal from "./components/CreateHistorialFormModal";
import AddClienteTrabajoFormModal from "./components/AddClienteTrabajoFormModal";
import AddPagoTrabajoFormModal from "./components/AddPagoTrabajoFormModal";

const INITIAL_FORM_DATA = {
  descripcion: "",
  tipo_trabajo_id: "",
  direccion_campo: "",
  monto_total: "",
  observaciones: "",
};
const INITIAL_HISTORIAL_FORM = {
  estado_trabajo: "",
  departamento_actual: "",
  observaciones: "",
  fecha_estimada_siguiente_paso: "",
};
const INITIAL_CLIENTE_FORM = {
  cliente: "",
  tipo_etiqueta: "PRINCIPAL",
  observaciones: "",
};
const INITIAL_PAGO_FORM = {
  forma_pago: "",
  fecha_pago: "",
  monto: "",
  observaciones: "",
};

const Trabajos = () => {
  const {
    tiposTrabajo,
    estadosTrabajo,
    clientesDisponibles,
    formaPago,
    loadAllCatalogos,
  } = useCatalogos();
  const {
    trabajos,
    loading,
    loadTrabajos,
    createTrabajo,
    updateTrabajo,
    toggleTrabajoActivo,
  } = useTrabajos();
  const { historial, loadHistorial, createHistorialItem, setHistorial } = useHistorial();
  const { addCliente, removeCliente } = useClientesTrabajo();
  const { addPago, removePago} = usePagos();
  const [showModal, setShowModal] = useState(false);
  const [showHistorialModal, setShowHistorialModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showCreateHistorialModal, setShowCreateHistorialModal] =
    useState(false);
  const [editingTrabajo, setEditingTrabajo] = useState<Trabajo | null>(null);
  const [selectedTrabajo, setSelectedTrabajo] = useState<Trabajo | null>(null);
  const [selectedTrabajoId, setSelectedTrabajoId] = useState<number | null>(
    null
  );
  const [showAgregarClienteModal, setShowAgregarClienteModal] = useState(false);
  const [showAgregarPagoModal, setShowAgregarPagoModal] = useState(false);
  const [formData, setFormData] =
    useState<Record<string, any>>(INITIAL_FORM_DATA);
  const [historialFormData, setHistorialFormData] = useState<
    Record<string, any>
  >(INITIAL_HISTORIAL_FORM);
  const [clienteFormData, setClienteFormData] =
    useState<Record<string, any>>(INITIAL_CLIENTE_FORM);
  const [pagoFormData, setPagoFormData] =
    useState<Record<string, any>>(INITIAL_PAGO_FORM);
  useEffect(() => {
    loadTrabajos();
    loadAllCatalogos();
  }, [loadTrabajos]);

  const deleteTrabajos = (trabajo: Trabajo) => {
    if (!confirm("¿Seguro que quieres eliminar este trabajo?")) return;

    toggleTrabajoActivo(trabajo.id, !trabajo.estado);
  };
  const createHistorial = async () => {
  if (!selectedTrabajoId) return;

  try {
    await createHistorialItem(selectedTrabajoId, {
      estado_trabajo: Number(historialFormData.estado_trabajo),
      departamento_actual: historialFormData.departamento_actual,
      observaciones: historialFormData.observaciones,
      fecha_estimada_siguiente_paso:
        historialFormData.fecha_estimada_siguiente_paso || null,
    });
    await loadTrabajos();
    alert("Historial agregado correctamente ✅");
    handleCloseCreateHistorialModal();
  } catch (err: any) {
    alert(JSON.stringify(err?.response?.data || err));
  }
};
  const agregarClienteTrabajo = async () => {
    if (!selectedTrabajoId || !clienteFormData.cliente) return;

    try {
      await addCliente(selectedTrabajoId, {
        cliente: Number(clienteFormData.cliente),
        tipo_etiqueta: clienteFormData.tipo_etiqueta,
        observaciones: clienteFormData.observaciones || null,
      });

      alert("Cliente agregado correctamente");
      handleCloseAgregarClienteModal();

      if (selectedTrabajo) handleViewInfo(selectedTrabajo);
    } catch (err: any) {
      alert(JSON.stringify(err?.response?.data || err));
    }
  };
  const eliminarClienteTrabajo = async (clienteTrabajoId: number) => {
    if (!selectedTrabajoId) return;
    if (!confirm("¿Estás seguro de eliminar este cliente del trabajo?")) return;

    try {
      await removeCliente(selectedTrabajoId, clienteTrabajoId);

      alert("Cliente eliminado correctamente");
      if (selectedTrabajo) handleViewInfo(selectedTrabajo);
    } catch (err: any) {
      alert(JSON.stringify(err?.response?.data || err));
    }
  };
  const crearPagoTrabajo = async () => {
    if (!selectedTrabajo?.cuenta?.id) return;

    try {
      await addPago({
        cuenta_cobrar: selectedTrabajo.cuenta.id,
        forma_pago: Number(pagoFormData.forma_pago),
        fecha_pago: pagoFormData.fecha_pago,
        monto: pagoFormData.monto,
        observaciones: pagoFormData.observaciones || null,
      });

      alert("Pago registrado correctamente ✅");
      handleCloseAgregarPagoModal();

      // recargar info del trabajo abierto
      handleViewInfo(selectedTrabajo);
    } catch (err: any) {
      alert(JSON.stringify(err?.response?.data || err));
    }
  };
  const eliminarPagoTrabajo = async (pagoId: number) => {
    if (!confirm("¿Seguro que deseas eliminar este pago?")) return;

    try {
      await removePago(pagoId);
      alert("Pago eliminado correctamente ✅");

      if (selectedTrabajo) {
        handleViewInfo(selectedTrabajo); // refrescar info
      }
    } catch (err: any) {
      alert(JSON.stringify(err?.response?.data || err));
    }
  };
  //HANDLERS
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTrabajo(null);
    setFormData(INITIAL_FORM_DATA);
  };
  const handleViewHistorial = async (trabajo: Trabajo) => {
    setSelectedTrabajoId(trabajo.id);
    await loadHistorial(trabajo.id);
    setShowHistorialModal(true);
  };
  const handleViewInfo = (trabajo: Trabajo) => {
    setSelectedTrabajoId(trabajo.id);
    api
      .get(`/trabajos/${trabajo.id}/`)
      .then((res) => {
        setSelectedTrabajo(res.data);
        setShowInfoModal(true);
      })
      .catch(() => alert("No se pudo obtener la información"));
  };
  const handleOpenEditModal = (trabajo: Trabajo) => {
    setEditingTrabajo(trabajo);
    setFormData({
      descripcion: trabajo.descripcion,
      tipo_trabajo_id: trabajo.tipo_trabajo.id,
      direccion_campo: trabajo.direccion_campo || "",
      monto_total: trabajo.monto_total || "",
      observaciones: trabajo.observaciones || "",
    });
    setShowModal(true);
  };
  const handleCloseHistorialModal = () => {
    setShowHistorialModal(false);
    setHistorial([]);
    setSelectedTrabajoId(null);
  };
  const handleOpenCreateHistorialModal = () => {
    setHistorialFormData(INITIAL_HISTORIAL_FORM);
    setShowCreateHistorialModal(true);
  };
  const handleCloseInfoModal = () => {
    setShowInfoModal(false);
    setSelectedTrabajo(null);
  };
  const handleCloseCreateHistorialModal = () => {
    setShowCreateHistorialModal(false);
    setHistorialFormData(INITIAL_HISTORIAL_FORM);
  };
  const handleOpenAgregarClienteModal = () => {
    setClienteFormData(INITIAL_CLIENTE_FORM);
    setShowAgregarClienteModal(true);
  };
  const handleCloseAgregarClienteModal = () => {
    setShowAgregarClienteModal(false);
    setClienteFormData(INITIAL_CLIENTE_FORM);
  };
  const handleOpenAgregarPagoModal = () => {
    setPagoFormData(INITIAL_PAGO_FORM);
    setShowAgregarPagoModal(true);
  };
  const handleCloseAgregarPagoModal = () => {
    setShowAgregarPagoModal(false);
    setPagoFormData(INITIAL_PAGO_FORM);
  };
  const handleSubmit = async () => {
    if (editingTrabajo) {
      await updateTrabajo(editingTrabajo.id, formData);
    } else {
      await createTrabajo(formData);
    }
    handleCloseModal();
  };
  // Configuración del formulario
  const formFields: FormField[] = [
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
    {
      name: "descripcion",
      label: "Descripción",
      type: "textarea",
      placeholder: "Describe el trabajo a realizar...",
      required: true,
      rows: 3,
    },
    {
      name: "direccion_campo",
      label: "Dirección de Campo",
      type: "text",
      placeholder: "Ubicación del trabajo...",
    },
    {
      name: "monto_total",
      label: "Monto Total",
      type: "number",
      placeholder: "0.00",
    },
    {
      name: "observaciones",
      label: "Observaciones",
      type: "textarea",
      placeholder: "Notas adicionales...",
      rows: 3,
    },
  ];
  const historialFormFields: FormField[] = [
    {
      name: "estado_trabajo",
      label: "Estado del Trabajo",
      type: "select",
      required: true,
      options: estadosTrabajo.map((estado) => ({
        value: estado.id,
        label: estado.nombre,
      })),
    },
    {
      name: "departamento_actual",
      label: "Departamento",
      type: "text",
      placeholder: "Departamento asignado...",
    },
    {
      name: "observaciones",
      label: "Observaciones",
      type: "textarea",
      placeholder: "Detalles del cambio de estado...",
      rows: 3,
    },
    {
      name: "fecha_estimada_siguiente_paso",
      label: "Fecha Estimada Próximo Paso",
      type: "date",
    },
  ];
  const clienteFormFields: FormField[] = [
    {
      name: "cliente",
      label: "Cliente",
      type: "select",
      required: true,
      options: clientesDisponibles.map((cliente) => ({
        value: cliente.id,
        label: `${cliente.nombre} - ${cliente.telefono}`,
      })),
    },
    {
      name: "tipo_etiqueta",
      label: "Tipo de Etiqueta",
      type: "select",
      required: true,
      options: [
        { value: "PRINCIPAL", label: "Principal" },
        { value: "PROPIETARIO", label: "Propietario" },
        { value: "CONTACTO", label: "Contacto" },
      ],
    },
    {
      name: "observaciones",
      label: "Observaciones",
      type: "textarea",
      placeholder: "Notas sobre este cliente en el trabajo...",
      rows: 3,
    },
  ];
  const pagoFormFields: FormField[] = [
    {
      name: "forma_pago",
      label: "Forma de Pago",
      type: "select",
      required: true,
      options: formaPago.map((fp) => ({
        value: fp.id,
        label: fp.nombre,
      })),
    },
    {
      name: "fecha_pago",
      label: "Fecha de Pago",
      type: "date",
      required: true,
    },
    {
      name: "monto",
      label: "Monto",
      type: "number",
      required: true,
    },
    {
      name: "observaciones",
      label: "Observaciones",
      type: "textarea",
      rows: 2,
    },
  ]
  // Configuración de la tabla
  const tableColumns: TableColumn<Trabajo>[] = [
    {
      key: "numero_trabajo",
      label: "Número",
      width: "10%",
    },
    {
      key: "descripcion",
      label: "Descripción",
      width: "30%",
    },
    {
      key: "tipo_trabajo.nombre",
      label: "Tipo",
      width: "20%",
      render: (trabajo) => (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#a8b89f] text-[#4a5a3d]">
          {trabajo.tipo_trabajo?.nombre || "-"}
        </span>
      ),
    },
    {
      key: "monto_total",
      label: "Monto total",
      width: "10%",
    },
    {
      key: "saldo_pendiente",
      label: "Saldo Pendiente",
      width: "10%",
    },
    {
      key: "estado_pago",
      label: "Estado Pago",
      width: "30%",
    },
    {
      key: "estado_actual",
      label: "Estado",
      width: "30%",
      render: (trabajo) => (
        <span
          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
          style={{
            backgroundColor: trabajo.estado_actual?.color_hex
              ? `${trabajo.estado_actual.color_hex}20`
              : "#e5e7eb",
            color: trabajo.estado_actual?.color_hex || "#374151",
          }}
        >
          {trabajo.estado_actual?.nombre || "Sin estado"}
        </span>
      ),
    },
  ];

  const tableActions: TableAction<Trabajo>[] = [
    {
      label: "",
      onClick: (trabajo) => handleViewInfo(trabajo),
      variant: "secondary",
      icon: <Info className="w-4 h-4" />,
    },
    {
      label: "",
      onClick: (trabajo) => handleViewHistorial(trabajo),
      variant: "secondary",
      icon: <History className="w-4 h-4" />,
    },
    {
      label: "",
      onClick: handleOpenEditModal,
      variant: "primary",
      icon: <Pencil className="w-4 h-4" />,
    },
    {
      label: "",
      onClick: (trabajo) => deleteTrabajos(trabajo),
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
      {/* Formulario Modal CREAR/ EDITAR TRABAJO*/}
      <TrabajoFormModal
        open={showModal}
        onClose={handleCloseModal}
        title="Registrar/Actualizar Trabajo"
        fields={formFields}
        formData={formData}
        onChange={(name, value) => setFormData({ ...formData, [name]: value })}
        onSubmit={handleSubmit}
        submitText={editingTrabajo ? "Guardar Cambios" : "Registrar Trabajo"}
        loading={loading}
      />
      {/* Modal Ver Info Completa */}
      <ViewInfoTrabajoModal
        open={showInfoModal}
        onClose={handleCloseInfoModal}
        selectedTrabajo={selectedTrabajo}
        handleOpenAgregarClienteModal={handleOpenAgregarClienteModal}
        eliminarClienteTrabajo={eliminarClienteTrabajo}
        handleOpenAgregarPagoModal={handleOpenAgregarPagoModal}
        eliminarPago={eliminarPagoTrabajo}
      />

      {/* Modal historial VIEW HISTORIAL*/}
      <ViewHistorialTrabajoModal
        open={showHistorialModal}
        onClose={handleCloseHistorialModal}
        historial={historial}
        handleOpenCreateHistorialModal={handleOpenCreateHistorialModal}
      />
      {/* Modal Crear Historial FORM */}
      <CreateHistorialFormModal
        open={showCreateHistorialModal}
        onClose={handleCloseCreateHistorialModal}
        historialFormFields={historialFormFields}
        historialFormData={historialFormData}
        setHistorialFormData={setHistorialFormData}
        createHistorial={createHistorial}
      />
      {/* Modal Agregar Cliente FORM */}
      <AddClienteTrabajoFormModal
        open={showAgregarClienteModal}
        onClose={handleCloseAgregarClienteModal}
        clienteFormFields={clienteFormFields}
        clienteFormData={clienteFormData}
        setClienteFormData={setClienteFormData}
        agregarClienteTrabajo={agregarClienteTrabajo}
      />
      {/* Modal para Crear Pagos a Trabajos */}
      <AddPagoTrabajoFormModal 
        open={showAgregarPagoModal}
        onClose={handleCloseAgregarPagoModal}
        pagoFormFields={pagoFormFields}
        pagoFormData={pagoFormData}
        setPagoFormData={setPagoFormData}
        crearPagoTrabajo={crearPagoTrabajo}
      />
      <br />
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
