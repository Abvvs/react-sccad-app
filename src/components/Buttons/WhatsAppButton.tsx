import { Button } from "./Button";

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
  text?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'whatsapp';
  className?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = '593980120958',
  message = '¡Hola! Me gustaría obtener más información.',
  text = 'Contáctanos por WhatsApp',
  size = 'md',
  variant = 'whatsapp',
  className = '',
}) => {
  // Limpiar el número de teléfono (remover espacios, guiones, etc.)
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  
  // Codificar el mensaje para URL
  const encodedMessage = encodeURIComponent(message);
  
  // Crear URL de WhatsApp
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
  
  return (
    <Button
      href={whatsappUrl}
      variant={variant}
      size={size}
      icon="whatsapp"
      iconPosition="left"
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {text}
    </Button>
  );
};