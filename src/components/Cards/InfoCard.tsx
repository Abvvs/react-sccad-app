import React from "react";

interface InfoFieldProps {
  label: string;
  value: string | number | React.ReactNode;
  span?: 1 | 2; // Para ocupar 1 o 2 columnas
}

interface InfoCardProps {
  title?: string;
  data: InfoFieldProps[];
  className?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, data, className = "" }) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
      )}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4">
          {data.map((field, index) => (
            <div
              key={index}
              className={`${field.span === 2 ? "col-span-2" : "col-span-1"}`}
            >
              <p className="text-sm font-semibold text-gray-600 mb-1">
                {field.label}:
              </p>
              <div className="text-base text-gray-900">{field.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Componente auxiliar para badges de estado
export const StatusBadge: React.FC<{
  active: boolean;
  activeText?: string;
  inactiveText?: string;
}> = ({ active, activeText = "Activo", inactiveText = "Inactivo" }) => (
  <span
    className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
      active
        ? "bg-green-100 text-green-800"
        : "bg-red-100 text-red-800"
    }`}
  >
    {active ? activeText : inactiveText}
  </span>
);

export default InfoCard;