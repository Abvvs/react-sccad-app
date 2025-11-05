import React, { type ReactNode, type ElementType } from "react";

interface ContactInfoCardProps {
  icon: ElementType;             // el componente del ícono (ej. MapPin, Phone, etc.)
  title: string;                 // el título del bloque
  children?: ReactNode;          // contenido opcional dentro de la tarjeta
  iconBgColor?: string;          // color de fondo opcional para el ícono
}

const ContactInfoCard: React.FC<ContactInfoCardProps> = ({ icon: Icon, title, children, iconBgColor = "bg-[#d45500]/20" }) => {
  return (
    <div className="flex flex-col items-start gap-3">
      <div className={`w-12 h-12 ${iconBgColor} rounded-lg flex items-center justify-center`}>
        <Icon className="w-6 h-6 text-[#d45500]" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <div className="text-gray-600 space-y-1">
          {children}
        </div>
      </div>
    </div>
  )
}

export default ContactInfoCard