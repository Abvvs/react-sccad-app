import React from "react";
import Modal from "../../../components/Modals/Modal";
import DynamicForm from "../../../components/Forms/DynamicForm";


interface AddClienteTrabajoFormModalProps {
  open: boolean;
  onClose: () => void;
  clienteFormFields: any[];
  clienteFormData: Record<string, any>;
  setClienteFormData: (data: Record<string, any>) => void;
  agregarClienteTrabajo: () => void;
}

const AddClienteTrabajoFormModal: React.FC<AddClienteTrabajoFormModalProps> = ({
  open,
  onClose,
  clienteFormFields,
  clienteFormData,
  setClienteFormData,
  agregarClienteTrabajo,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Agregar Cliente al Trabajo"
    >
      <DynamicForm
        title=""
        fields={clienteFormFields}
        formData={clienteFormData}
        onChange={(name, value) =>
          setClienteFormData({ ...clienteFormData, [name]: value })
        }
        onSubmit={agregarClienteTrabajo}
        submitText="Agregar Cliente"
      />
    </Modal>
  );
};

export default AddClienteTrabajoFormModal;