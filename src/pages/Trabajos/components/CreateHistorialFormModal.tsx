import React from "react";
import Modal from "../../../components/Modals/Modal";
import DynamicForm from "../../../components/Forms/DynamicForm";

interface CreateHistorialFormModalProps {
  open: boolean;
  onClose: () => void;
  historialFormFields: any[];
  historialFormData: Record<string, any>;
  setHistorialFormData: (data: Record<string, any>) => void;
  createHistorial: () => void;
}

const CreateHistorialFormModal: React.FC<CreateHistorialFormModalProps> = ({
  open,
  onClose,
  historialFormFields,
  historialFormData,
  setHistorialFormData,
  createHistorial,
}) => {
  return (
    <Modal open={open} onClose={onClose} title="Agregar Nuevo Estado">
      <DynamicForm
        title=""
        fields={historialFormFields}
        formData={historialFormData}
        onChange={(name, value) =>
          setHistorialFormData({ ...historialFormData, [name]: value })
        }
        onSubmit={createHistorial}
        submitText="Agregar Estado"
      />
    </Modal>
  );
};

export default CreateHistorialFormModal;