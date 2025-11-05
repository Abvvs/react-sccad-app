import React, { type FormEvent } from "react";

// Tipos de campos soportados
export type FieldType = "text" | "textarea" | "select" | "number" | "email" | "date";

// Definición de un campo del formulario
export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  options?: Array<{ value: string | number; label: string }>; // Para selects
  rows?: number; // Para textarea
}

// Props del componente
interface DynamicFormProps {
  title: string;
  fields: FormField[];
  formData: Record<string, any>;
  onChange: (name: string, value: any) => void;
  onSubmit: () => void;
  submitText?: string;
  loading?: boolean;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  title,
  fields,
  formData,
  onChange,
  onSubmit,
  submitText = "Guardar",
  loading = false,
}) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSubmit();
  };

  const renderField = (field: FormField) => {
    const baseInputClasses =
      "w-full px-4 py-3 rounded-lg border border-[#b8b5ad] bg-white focus:outline-none focus:ring-2 focus:ring-[#d45500] focus:border-transparent text-[#4a4741] placeholder:text-[#858278] transition-all";

    switch (field.type) {
      case "textarea":
        return (
          <textarea
            name={field.name}
            value={formData[field.name] || ""}
            onChange={(e) => onChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            rows={field.rows || 4}
            className={`${baseInputClasses} resize-none`}
          />
        );

      case "select":
        return (
          <select
            name={field.name}
            value={formData[field.name] || ""}
            onChange={(e) => onChange(field.name, e.target.value)}
            required={field.required}
            className={baseInputClasses}
          >
            <option value="">Seleccione una opción</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      default:
        return (
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name] || ""}
            onChange={(e) => onChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            className={baseInputClasses}
          />
        );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-[#e0ddd5] p-6 md:p-8">
      <h2 className="text-2xl md:text-3xl font-bold text-[#5c4a3a] mb-6">
        {title}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {fields.map((field) => (
          <div key={field.name}>
            <label
              htmlFor={field.name}
              className="block text-sm font-semibold text-[#4a4741] mb-2"
            >
              {field.label}
              {field.required && <span className="text-[#d45500] ml-1">*</span>}
            </label>
            {renderField(field)}
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-[#d45500] hover:bg-[#ff7a33] active:bg-[#a34400] text-white font-bold py-3.5 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#d45500] focus:ring-offset-2"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Procesando...
            </span>
          ) : (
            submitText
          )}
        </button>
      </form>
    </div>
  );
};

export default DynamicForm;