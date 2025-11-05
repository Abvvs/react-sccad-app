
import React from 'react';
import { MessageCircle, Phone, Mail, ArrowRight } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'whatsapp';
  size?: 'sm' | 'md' | 'lg';
  icon?: 'whatsapp' | 'phone' | 'mail' | 'arrow' | 'none';
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  className?: string;
  target?: string;
  rel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  icon = 'none',
  iconPosition = 'right',
  fullWidth = false,
  className = '',
  target,
  rel,
}) => {
  // Estilos base
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-bold rounded-lg transition-all duration-300 hover:scale-105 active:scale-95';
  
  // Variantes de color
  const variants = {
    primary: 'bg-[#d45500] text-white hover:bg-[#b84600] shadow-lg hover:shadow-xl',
    secondary: 'bg-gray-800 text-white hover:bg-gray-700',
    outline: 'bg-transparent border-2 border-[#d45500] text-[#d45500] hover:bg-[#d45500] hover:text-white',
    whatsapp: 'bg-[#25D366] text-white hover:bg-[#20BA5A] shadow-lg hover:shadow-xl',
  };
  
  // Tamaños
  const sizes = {
    sm: 'text-sm py-2 px-4',
    md: 'text-base py-3 px-6',
    lg: 'text-lg py-4 px-8',
  };
  
  // Iconos
  const icons = {
    whatsapp: <MessageCircle className="w-5 h-5" />,
    phone: <Phone className="w-5 h-5" />,
    mail: <Mail className="w-5 h-5" />,
    arrow: <ArrowRight className="w-5 h-5" />,
    none: null,
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  const finalClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`;
  
  const content = (
    <>
      {icon !== 'none' && iconPosition === 'left' && icons[icon]}
      {children}
      {icon !== 'none' && iconPosition === 'right' && icons[icon]}
    </>
  );
  
  if (href) {
    return (
      <a
        href={href}
        className={finalClassName}
        target={target}
        rel={rel}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }
  
  return (
    <button onClick={onClick} className={finalClassName}>
      {content}
    </button>
  );
};