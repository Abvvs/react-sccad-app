import React from "react";
import Modal from "../../../components/Modals/Modal";
import DynamicForm from "../../../components/Forms/DynamicForm";

interface AddPagoTrabajoFormModalProps{
    open: boolean;
    onClose: () => void;
    pagoFormFields: any[];
    pagoFormData: Record<string, any>;
    setPagoFormData: (data: Record<string, any>) => void;
    crearPagoTrabajo: () => void;
}

const AddPagoTrabajoFormModal: React.FC<AddPagoTrabajoFormModalProps> = ({
    open,
    onClose,
    pagoFormFields,
    pagoFormData,
    setPagoFormData,
    crearPagoTrabajo,
}) =>{
    return (
    <Modal
      open={open}
      onClose={onClose}
      title="Nuevo Pago"
    >
      <DynamicForm
        title=""
        fields={pagoFormFields}
        formData={pagoFormData}
        onChange={(name, value) =>
          setPagoFormData({ ...pagoFormData, [name]: value })
        }
        onSubmit={crearPagoTrabajo}
        submitText="Agregar Cliente"
      />
    </Modal>
  );
};
export default AddPagoTrabajoFormModal;