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

const ListGroup: React.FC<ListGroupProps> =  ({mobile = false, onLinkClick, navLinkList}:ListGroupProps) => {
  const location = useLocation(); // obtiene la ruta actual

  return (
    <nav
      className={`${ mobile ? "flex flex-col items-center gap-4" : "flex items-center gap-8"}`}
    >
      {navLinkList.map((links) => {
        const isActive = location.pathname === links.href;// marca activo según URL
        return(
        <Link
          key={links.name}
          to={links.href}
          onClick= {onLinkClick}
          className={`text-sm font-medium transition-colors ${
            isActive ? 'text-[#d45500]' : 'hover:text-[#d45500]  text-gray-500'
          }`}
        >
          {links.name}
        </Link>
        );
    })}
    </nav>
  );
};

export default ListGroup;
