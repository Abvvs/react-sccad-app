import React from "react";
import { Link, useLocation } from "react-router-dom";
interface NavLink {
  name: string;
  href: string;
}
interface ListGroupProps {
  mobile?: boolean;
  onLinkClick?: () => void;
  navLinkList: NavLink[];
}

const ListGroup: React.FC<ListGroupProps> = ({
  mobile = false,
  onLinkClick,
  navLinkList,
}: ListGroupProps) => {
  const location = useLocation(); // obtiene la ruta actual

  return (
    <nav
      className={`${mobile ? "flex flex-col items-center gap-3" : "flex items-center gap-8"}`}
    >
      {navLinkList.map((links) => {
        const isActive =
          links.href === "/"
            ? location.pathname === "/" && !location.hash
            : links.href.startsWith("/#")
              ? location.pathname === "/" &&
                location.hash === links.href.replace("/", "")
              : location.pathname === links.href; // marca activo según URL
        return (
          <Link
            key={links.name}
            to={links.href}
            onClick={onLinkClick}
            className={` group relative px-2 py-1 text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              isActive ? "text-primary" : ""
            } ${mobile ? "text-base" : ""}`}
          >
            {links.name}
            {/* Indicador activo / hover */}
            <span
              className={`
                absolute left-0 -bottom-1
                h-0.5 w-full
                bg-primary
                rounded-full
                transition-transform duration-300
                origin-left
                ${
                  isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }
              `}
            />
          </Link>
        );
      })}
    </nav>
  );
};

export default ListGroup;
