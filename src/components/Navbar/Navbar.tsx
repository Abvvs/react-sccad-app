import { useState } from "react";
import ListGroup from "./ListGroup";
import NavLogo from "./NavLogo";
import { Menu, X } from "lucide-react";

const navLinkList = [
  { name: "Servicios", href: "/" },
  { name: "Ventanilla Virtual", href: "/ventanilla" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm dark:shadow-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <NavLogo />
          {/* MENÚ DESKTOP */}
          <div className="hidden md:flex">
            <ListGroup navLinkList={navLinkList}/>
          </div>

          {/* BOTÓN HAMBURGUESA */}
          <button
            className="md:hidden text-gray-700 dark:text-gray-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* MENÚ MÓVIL */}
        {isOpen && (
          <div className="flex flex-col items-center gap-4 mt-4 md:hidden">
            <ListGroup mobile onLinkClick={() => setIsOpen(false)} navLinkList={navLinkList} />
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
