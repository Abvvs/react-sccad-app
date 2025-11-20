import DynamicForm, {
  type FormField,
} from "../../../components/Forms/DynamicForm";
import Modal from "../../../components/Modals/Modal";

interface TrabajoFormModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  fields: FormField[];
  formData: Record<string, any>;
  onChange: (name: string, value: any) => void;
  onSubmit: () => void;
  submitText?: string;
  loading?: boolean;
}

const TrabajoFormModal: React.FC<TrabajoFormModalProps> = ({
  open,
  onClose,
  title = "Agregar Cliente al Trabajo",
  fields,
  formData,
  onChange,
  onSubmit,
  submitText = "Guardar",
  loading = false,
}) => {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <DynamicForm
        title=""
        fields={fields}
        formData={formData}
        onChange={onChange}
        onSubmit={onSubmit}
        submitText={submitText}
        loading={loading}
      />
    </Modal>
  );
};

export default TrabajoFormModal;
