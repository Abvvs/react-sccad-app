import React from "react";

// Definición de columna
export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  render?: (item: T) => React.ReactNode; // Función personalizada para renderizar
  width?: string; // Ancho personalizado
}

// Definición de acción (botones)
export interface TableAction<T> {
  label: string;
  onClick: (item: T) => void;
  variant?: "primary" | "danger" | "secondary";
  icon?: React.ReactNode;
}

// Props del componente
interface DynamicTableProps<T> {
  title?: string;
  columns: TableColumn<T>[];
  data: T[];
  actions?: TableAction<T>[];
  emptyMessage?: string;
  keyExtractor: (item: T) => string | number;
}

const DynamicTable = <T extends Record<string, any>>({
  title,
  columns,
  data,
  actions,
  emptyMessage = "No hay datos disponibles",
  keyExtractor,
}: DynamicTableProps<T>) => {
  const getActionClasses = (variant: TableAction<T>["variant"] = "primary") => {
    const baseClasses =
      "px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1";

    const variants = {
      primary: "bg-[#6b7c5d] hover:bg-[#4a5a3d] text-white focus:ring-[#6b7c5d]",
      danger: "bg-[#d45500] hover:bg-[#a34400] text-white focus:ring-[#d45500]",
      secondary:
        "bg-[#c4a57b] hover:bg-[#8b7355] text-white focus:ring-[#c4a57b]",
    };

    return `${baseClasses} ${variants[variant]}`;
  };

  const getCellValue = (item: T, column: TableColumn<T>) => {
    if (column.render) {
      return column.render(item);
    }

    // Acceso anidado (ej: "tipo_trabajo.nombre")
    const keys = String(column.key).split(".");
    let value: any = item;

    for (const key of keys) {
      value = value?.[key];
      if (value === undefined || value === null) break;
    }

    return value ?? "-";
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-[#e0ddd5] overflow-hidden">
      {title && (
        <div className="px-6 py-4 border-b border-[#e0ddd5] bg-[#f5f5f0]">
          <h2 className="text-2xl font-bold text-[#5c4a3a]">{title}</h2>
        </div>
      )}

      {/* Vista Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#e8d5c4]">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-6 py-4 text-left text-sm font-semibold text-[#5c4a3a] uppercase tracking-wider"
                  style={{ width: column.width }}
                >
                  {column.label}
                </th>
              ))}
              {actions && actions.length > 0 && (
                <th className="px-6 py-4 text-right text-sm font-semibold text-[#5c4a3a] uppercase tracking-wider">
                  Acciones
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e0ddd5]">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="px-6 py-8 text-center text-[#858278]"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr
                  key={keyExtractor(item)}
                  className="hover:bg-[#f5f5f0] transition-colors"
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-6 py-4 text-sm text-[#4a4741]"
                    >
                      {getCellValue(item, column)}
                    </td>
                  ))}
                  {actions && actions.length > 0 && (
                    <td className="px-6 py-4 text-right">
                      <div className="flex gap-2 justify-end">
                        {actions.map((action, actionIndex) => (
                          <button
                            key={actionIndex}
                            onClick={() => action.onClick(item)}
                            className={getActionClasses(action.variant)}
                          >
                            {action.icon && (
                              <span className="inline-block mr-1">
                                {action.icon}
                              </span>
                            )}
                            {action.label}
                          </button>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Vista Mobile - Cards */}
      <div className="md:hidden divide-y divide-[#e0ddd5]">
        {data.length === 0 ? (
          <div className="px-6 py-8 text-center text-[#858278]">
            {emptyMessage}
          </div>
        ) : (
          data.map((item) => (
            <div
              key={keyExtractor(item)}
              className="p-4 hover:bg-[#f5f5f0] transition-colors"
            >
              {columns.map((column, colIndex) => (
                <div key={colIndex} className="mb-3 last:mb-0">
                  <span className="text-xs font-semibold text-[#858278] uppercase tracking-wide block mb-1">
                    {column.label}
                  </span>
                  <span className="text-sm text-[#4a4741]">
                    {getCellValue(item, column)}
                  </span>
                </div>
              ))}
              {actions && actions.length > 0 && (
                <div className="flex gap-2 mt-4 pt-3 border-t border-[#e0ddd5]">
                  {actions.map((action, actionIndex) => (
                    <button
                      key={actionIndex}
                      onClick={() => action.onClick(item)}
                      className={`${getActionClasses(action.variant)} flex-1`}
                    >
                      {action.icon && (
                        <span className="inline-block mr-1">{action.icon}</span>
                      )}
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DynamicTable;