import React, { type JSX } from "react";
import { MessageCircle, Phone, Mail, ArrowRight } from "lucide-react";

type Variant = "primary" | "secondary" | "outline" | "cta" | "whatsapp";
type Size = "sm" | "md" | "lg";
type IconType = "whatsapp" | "phone" | "mail" | "arrow" | "none";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  icon?: IconType;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  className?: string;
  target?: string;
  rel?: string;
}
const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-md transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",

  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",

  outline: "border border-border bg-transparent text-foreground hover:bg-muted",

  cta: "bg-primary text-primary-foreground shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0",

  whatsapp:
    "bg-[#25D366] text-white hover:bg-[#20BA5A] shadow-sm hover:shadow-md",
};
const sizes: Record<Size, string> = {
  sm: "text-sm px-3 py-1.5",
  md: "text-base px-4 py-2",
  lg: "text-lg px-6 py-3",
};
const icons: Record<IconType, JSX.Element | null> = {
  whatsapp: <MessageCircle className="w-5 h-5" />,
  phone: <Phone className="w-5 h-5" />,
  mail: <Mail className="w-5 h-5" />,
  arrow: <ArrowRight className="w-5 h-5" />,
  none: null,
};
export const Button: React.FC<ButtonProps> = ({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  icon = "none",
  iconPosition = "right",
  fullWidth = false,
  className = "",
  target,
  rel,
}) => {
  // Estilos base
  const finalClassName = [
    baseStyles,
    variants[variant],
    sizes[size],
    fullWidth ? "w-full" : "",
    className,
  ].join(" ");

  const content = (
    <>
      {icon !== "none" && iconPosition === "left" && icons[icon]}
      {children}
      {icon !== "none" && iconPosition === "right" && icons[icon]}
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
