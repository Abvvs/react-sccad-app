import { useState } from "react";
import ListGroup from "./ListGroup";
import NavLogo from "./NavLogo";
import { Menu, X } from "lucide-react";
import { Button } from "../Buttons/Button";

const navLinkList = [
  { name: "Inicio", href: "/#inicio" },
  { name: "Servicios", href: "/#servicios" },
  { name: "Sobre nosotros", href: "/#nosotros" },
  { name: "Proyectos", href: "/#proyectos" },
  { name: "Galería", href: "/#galeria" },
  { name: "Ventanilla Virtual", href: "/ventanilla" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border transition-colors">
      <div className="container mx-auto px-6 ">
        <div className="flex items-center justify-between h-16">
          <NavLogo />
          {/* MENÚ DESKTOP */}
          <div className="hidden md:flex">
            <ListGroup navLinkList={navLinkList} />
            {/* BOTÓN CTA */}
            <Button
              className="ml-4"
              href="#contacto"
              variant="cta"
              size="sm"
              icon="arrow"
            >
              Contáctanos
            </Button>
          </div>

          {/* BOTÓN HAMBURGUESA */}
          <button
            aria-label="Abrir menú"
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-muted focus:outline-none focus:ring-ring transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* MENÚ MÓVIL */}
        {isOpen && (
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
          >
            <div className=" flex flex-col items-center gap-4 py-4">
              <ListGroup
                mobile
                navLinkList={navLinkList}
                onLinkClick={() => setIsOpen(false)}
              />
              {/* BOTÓN CTA MOBILE */}
              <Button
                href="#contacto"
                variant="cta"
                size="sm"
                icon="arrow"
                fullWidth
                onClick={() => setIsOpen(false)}
                className="max-w-xs"
              >
                Contáctanos
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
